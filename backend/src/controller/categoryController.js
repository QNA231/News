import { json } from 'express';
import Category from '../models/Category.js';

export const getAllCategory = async (req, res) => {
    try {
        const result = await Category.aggregate([
            // { $match: query },
            {
                $facet: {
                    categories: [{ $sort: { createdAt: -1 } }],
                    visibleCount: [{ $match: { visible: { $eq: true } } }, { $count: "count" }]
                },
            },
        ]);

        const categories = result[0].categories;
        const visibleCount = result[0].visibleCount[0]?.count || 0;
        res.status(200).json({ categories, visibleCount });
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