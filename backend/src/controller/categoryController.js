import { json } from 'express';
import Category from '../models/Category.js';

export const getAllCategory = async (req, res) => {
    const showAll = req.query.all?.toLowerCase() === 'true';
    const baseMatch = showAll ? {} : { visible: { $eq: true } };

    try {
        const result = await Category.aggregate([
            { $match: baseMatch },
            {
                $facet: {
                    categories: [{ $sort: { createdAt: -1 } }],
                    totalCount: [{ $count: "count" }]
                },
            },
        ]);

        const categories = result[0].categories;
        const totalCount = result[0].totalCount[0]?.count || 0;
        res.status(200).json({ categories, totalCount });
    } catch (error) {
        console.error("Lỗi khi gọi getAllCategory", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const getBySlugCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const category = await Category.findOne({ slug: slug, visible: { $eq: true } });
        if (!category) {
            return res.status(404).json({ message: "Danh mục không tồn tại" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error("Lỗi khi gọi getAllCategory", error);
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { parentId, name } = req.body;
        const category = new Category({ parentId, name });
        const newCate = await category.save();
        res.status(200).json(newCate);
    } catch (error) {
        console.error("Lỗi khi createCategory", error);
        res.status(500).json({ message: "Lỗi hệ thống: " });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const { name, parentId } = req.body;
        const result = await Category.findByIdAndUpdate(
            req.params.id,
            { name, parentId },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ message: "Danh mục không tồn tại!" });
        }
        res.status(200).json({
            message: "Đã cập nhật bản ghi thành công",
            category: result
        });
    } catch (error) {
        console.error("Lỗi khi updateCategory", error);
        res.status(500).json({ message: "Lỗi hệ thống: " });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const result = await Category.findByIdAndUpdate(
            req.params.id,
            { visible: false, },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ message: "Danh mục không tồn tại!" });
        }
        res.status(200).json({
            message: "Đã xóa bản ghi thành công",
            category: result
        });
    } catch (error) {
        console.error("Lỗi khi deleteCategory", error);
        res.status(500).json({ message: "Lỗi hệ thống: " });
    }
};

export const restoreCategory = async (req, res) => {
    try {
        const result = await Category.findByIdAndUpdate(
            req.params.id,
            { visible: true, },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ message: "Danh mục không tồn tại!" });
        }
        res.status(200).json({
            message: "Đã khôi phục bản ghi thành công",
            category: result
        });
    } catch (error) {
        console.error("Lỗi khi restoreCategory", error);
        res.status(500).json({ message: "Lỗi hệ thống: " });
    }
};

export const forceDeleteCategory = async (req, res) => {
    try {
        const result = await Category.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Danh mục không tồn tại!" });
        }
        res.status(200).json({
            message: "Đã xóa hoàn toàn bản ghi thành công",
            category: result
        });
    } catch (error) {
        console.error("Lỗi khi forceDeleteCategory", error);
        res.status(500).json({ message: "Lỗi hệ thống: " });
    }
};