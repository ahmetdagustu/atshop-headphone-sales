// src/routes/productQuestionsRoutes.ts
import express from 'express';
import { productQandA } from '../data/productQuestions'; // productQandA verisini içe aktar

const router = express.Router();

// Tüm productQuestions verisini döndüren GET isteği
router.get('/', (_req, res) => {
    res.json(productQandA); // JSON formatında döndür
});

export default router;
