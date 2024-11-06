// src/routes/productRoutes.ts
import express from 'express';
import { products } from '../data/products';

const router = express.Router();

router.get('/', (req, res) => {
    res.json(products); // JSON formatında veri döndür
});

export default router;
