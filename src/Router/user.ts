import express from 'express';
import UserController from '@/Controller/V1/user';
import validate from '@/middlewares/validate';
import UserValidation from '@/Validations/user';

const router = express.Router();

router.get('/users', validate(UserValidation.getUsers), UserController.getUsers);

export default router;
