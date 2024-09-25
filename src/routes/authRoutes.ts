import { Router } from 'express';
import { login } from '../controllers/login.controller';
import { register } from '../controllers/register.controller';

const router = Router();

router.post('/login', login);
router.post('/register', register);

export default router;