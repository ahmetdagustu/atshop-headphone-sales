import { Router } from 'express';
const router = Router();

// Rotalarınızı buraya ekleyin
router.get('/', (req, res) => {
    res.send('Admin rotası çalışıyor');
});

export default router;
