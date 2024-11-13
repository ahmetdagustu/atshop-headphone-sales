"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/productQuestionsRoutes.ts
const express_1 = __importDefault(require("express"));
const productQuestions_1 = require("../data/productQuestions"); // productQandA verisini içe aktar
const router = express_1.default.Router();
// Tüm productQuestions verisini döndüren GET isteği
router.get('/', (_req, res) => {
    res.json(productQuestions_1.productQandA); // JSON formatında döndür
});
exports.default = router;
