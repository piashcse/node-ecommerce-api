import { Router } from 'express';
import {getUsers, createUser, loginUser} from '../controller/userController';
import { authenticateJWT } from '../middleware/authmiddleware'; // Import JWT authentication middleware

const router = Router();

router.get('/', authenticateJWT, getUsers);
router.post('/', createUser);
router.post('/login', loginUser);

export default router;
