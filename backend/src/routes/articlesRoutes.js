import express from 'express';
import {
    createArticle,
    deleteArticle,
    forceDeleteArticle,
    getAllArticle,
    getArticleByCategorySlug,
    getBySlugArticle,
    restoreArticle,
    updateArticle
} from '../controller/articleController.js';

const router = express.Router();

// public
router.get("/", getAllArticle);
router.get("/:slug", getBySlugArticle);
router.get("/category/:slug", getArticleByCategorySlug);

router.post("/", createArticle);

router.put("/:id", deleteArticle);
router.put("/:id/update", updateArticle);
router.put("/:id/restore", restoreArticle);

router.delete("/:id", forceDeleteArticle);

export default router;