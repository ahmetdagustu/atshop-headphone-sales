import { Router } from 'express';
import { getProducts, addProduct } from '../controllers/productController';

const router = Router();

router.get('/', getProducts);
router.post('/add', addProduct);

export default router;
