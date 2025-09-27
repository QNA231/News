import express from 'express';
import {
    createCategory,
    deleteCategory,
    forceDeleteCategory,
    getAllCategory,
    restoreCategory
} from '../controller/categoryController.js';

const router = express.Router();

// public
router.get("/", getAllCategory);

// router.get("/:id", getByIdCategory);

router.post("/", createCategory);

// router.put("/:id", updateCategory);

router.put("/:id", deleteCategory);

router.put("/:id/restore", restoreCategory);

router.delete("/:id", forceDeleteCategory);

export default router;
