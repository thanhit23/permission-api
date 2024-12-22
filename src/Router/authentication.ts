import express from 'express';
import AuthenticationController from '@/controller/auth/authentication';
import validate from '@/middlewares/validate';
import AuthenticationValidation from '@/validations/authentication';

const router = express.Router();

router.get('/me', AuthenticationController.me);
router.post('/register', validate(AuthenticationValidation.register), AuthenticationController.register);
router.post('/login', validate(AuthenticationValidation.login), AuthenticationController.login);

export default router;
