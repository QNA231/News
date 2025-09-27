import express from 'express';
import { connectDb } from './config/db.js';
import dotenv from 'dotenv';
import categoryRoutes from './routes/categoriesRoutes.js';
import articleRoutes from './routes/articlesRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

// middlewares
app.use(express.json());

// public gateway
app.use("/api/categories", categoryRoutes);
app.use("/api/articles", articleRoutes);

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server đã bắt đầu ở cổng ${PORT}`);
    });
});