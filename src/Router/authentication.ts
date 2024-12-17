import express from 'express';
import AuthenticationController from '@/Controller/V1/authentication';
import validate from '@/middlewares/validate';
import AuthenticationValidation from '@/Validations/authentication';
import authenticate from '@/middlewares/authenticate';
import { ROLE } from '@/config/roles';

const router = express.Router();

router.post('/register', validate(AuthenticationValidation.register), AuthenticationController.register);
router.post('/login', validate(AuthenticationValidation.login), AuthenticationController.login);
router.get('/me', authenticate(ROLE.user), AuthenticationController.me);

export default router;
