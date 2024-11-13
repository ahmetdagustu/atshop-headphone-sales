import { Router } from 'express';
import { reviews } from '../data/reviews';

const router = Router();


router.get('/', (req, res) => {
    res.json(reviews);
});

export default router;
