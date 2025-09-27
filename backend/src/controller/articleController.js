import { json } from 'express';
import Article from '../models/Article.js';
import Category from '../models/Category.js';

export const getAllArticle = async (req, res) => {
    const showAll = req.query.all?.toLowerCase() === 'true';
    const baseMatch = showAll ? {} : { visible: { $eq: true } };

    try {
        const result = await Article.aggregate([
            { $match: baseMatch },
            {
                $facet: {
                    articles: [{ $sort: { createdAt: -1 } }],
                    totalCount: [{ $count: "count" }]
                },
            },
        ]);

        const articles = result[0].articles;
        const totalCount = result[0].totalCount[0]?.count || 0;
        res.status(200).json({ articles, totalCount });
    } catch (error) {
        console.error("Lỗi khi gọi getAllArticle", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const getBySlugArticle = async (req, res) => {
    try {
        const { slug } = req.params;
        const article = await Article.findOne({ slug: slug, visible: { $eq: true } });
        if (!article) {
            return res.status(404).json({ message: "Bài viết không tồn tại" });
        }
        res.status(200).json(article);
    } catch (error) {
        console.error("Lỗi khi gọi getAllArticle", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const getArticleByCategorySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await Category.findOne({ slug: slug, visible: { $eq: true } });
    
        if (!category) {
            return res.status(404).json({ message: "Danh mục không tồn tại!" });
        }
        const articles = await Article.find({
            categoryId: category._id,
            visible: true
        }).sort({ position: -1, createdAt: -1 });
    
        if (!articles) {
            return res.status(404).json({ message: "Danh mục chưa có bài viết!" });
        }
        res.status(200).json({
            category: {
                name: category.name,
                slug: category.slug
            },
            articles: articles
        });        
    } catch (error) {        
        console.error("Lỗi khi gọi getArticleByCategorySlug", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const createArticle = async (req, res) => {
    try {
        const { parentId, name } = req.body;
        const article = new Article({ parentId, name });
        const newArticle = await article.save();
        res.status(200).json(newArticle);
    } catch (error) {
        console.error("Lỗi khi createArticle", error);
        res.status(500).json({ message: "Lỗi hệ thống: " });
    }
};

export const updateArticle = async (req, res) => {
    try {
        const { name, categoryId, hightlight, position, rating, metaTitle, metaDescription, content } = req.body;
        const result = await Article.findByIdAndUpdate(
            req.params.id,
            { name, categoryId, hightlight, position, rating, metaTitle, metaDescription, content },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ message: "Bài viết không tồn tại!" });
        }
        res.status(200).json({
            message: "Đã cập nhật bản ghi thành công",
            article: result
        });
    } catch (error) {
        console.error("Lỗi khi updateArticle", error);
        res.status(500).json({ message: "Lỗi hệ thống: " });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const result = await Article.findByIdAndUpdate(
            req.params.id,
            { visible: false, },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ message: "Bài viết không tồn tại!" });
        }
        res.status(200).json({
            message: "Đã xóa bản ghi thành công",
            article: result
        });
    } catch (error) {
        console.error("Lỗi khi deleteArticle", error);
        res.status(500).json({ message: "Lỗi hệ thống: " });
    }
};

export const restoreArticle = async (req, res) => {
    try {
        const result = await Article.findByIdAndUpdate(
            req.params.id,
            { visible: true, },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ message: "Bài viết không tồn tại!" });
        }
        res.status(200).json({
            message: "Đã khôi phục bản ghi thành công",
            article: result
        });
    } catch (error) {
        console.error("Lỗi khi restoreArticle", error);
        res.status(500).json({ message: "Lỗi hệ thống: " });
    }
};

export const forceDeleteArticle = async (req, res) => {
    try {
        const result = await Article.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Bài viết không tồn tại!" });
        }
        res.status(200).json({
            message: "Đã xóa hoàn toàn bản ghi thành công",
            article: result
        });
    } catch (error) {
        console.error("Lỗi khi forceDeleteArticle", error);
        res.status(500).json({ message: "Lỗi hệ thống: " });
    }
};