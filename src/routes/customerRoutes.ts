import { Router } from 'express';
import { customers } from '../data/customers'; 

const router = Router();


router.get('/', (req, res) => {
    res.json(customers);
});

export default router;