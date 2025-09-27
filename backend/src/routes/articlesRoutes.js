import express from 'express';

const router = express.Router();

// public
router.get("/", getAllArticle);

router.get("/:id", getByIdArticle);

router.post("/", createArticle);

router.put("/:id", updateArticle);

router.delete("/:id", deleteArticle);