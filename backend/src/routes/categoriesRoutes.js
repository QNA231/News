import express from 'express';
import {
    createCategory,
    deleteCategory,
    forceDeleteCategory,
    getAllCategory,
    getBySlugCategory,
    restoreCategory,
    updateCategory
} from '../controller/categoryController.js';

const router = express.Router();

// public
router.get("/", getAllCategory);
router.get("/:slug", getBySlugCategory);

router.post("/", createCategory);

router.put("/:id", deleteCategory);
router.put("/:id/update", updateCategory);
router.put("/:id/restore", restoreCategory);

router.delete("/:id", forceDeleteCategory);

export default router;
