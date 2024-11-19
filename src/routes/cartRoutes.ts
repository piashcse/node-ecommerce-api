import { Router } from 'express';
import { addToCart, viewCart, updateCartItem, removeFromCart } from '../controller/cartController';
import { authenticateJWT } from '../middleware/authmiddleware';

const router = Router();

router.post('/', authenticateJWT, addToCart);
router.get('/', authenticateJWT, viewCart);
router.put('/', authenticateJWT, updateCartItem);
router.delete('/:cartItemId', authenticateJWT, removeFromCart);

export default router;
