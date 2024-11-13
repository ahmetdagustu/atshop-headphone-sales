
import express from 'express';
import { orders } from '../data/orders'; // orders verisini data/orders.ts dosyasından içe aktar

const router = express.Router();


router.get('/', (req, res) => {
    res.json(orders); // Sipariş verilerini JSON formatında döndür
});

export default router;
