import express from 'express';
import UserController from '@/controller/V1/user';
import validate from '@/middlewares/validate';
import UserValidation from '@/validations/user';

const router = express.Router();

router.get('/users', validate(UserValidation.getUsers), UserController.getUsers);

export default router;
