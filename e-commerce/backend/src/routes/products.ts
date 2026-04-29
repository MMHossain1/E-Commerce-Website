import { Router } from 'express';
import { productController } from '../controllers/ProductController';

const router = Router();

router.get('/', productController.getAll);
router.get('/featured', productController.getFeatured);
router.get('/:id', productController.getById);

export default router;
