import express from 'express';
import { financeData } from '../data/finance';

const router = express.Router();

router.get('/', (req, res) => {
    res.json(financeData); 
});

export default router;
