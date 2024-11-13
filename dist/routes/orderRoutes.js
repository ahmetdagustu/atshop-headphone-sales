"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_1 = require("../data/orders"); // orders verisini data/orders.ts dosyasından içe aktar
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json(orders_1.orders); // Sipariş verilerini JSON formatında döndür
});
exports.default = router;
