import { Router } from 'express';
const router = Router();

// Rotalarınızı buraya ekleyin
router.get('/', (req, res) => {
    res.send('Müşteri rotası çalışıyor');
});

export default router;
