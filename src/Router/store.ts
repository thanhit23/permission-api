import express from 'express';

import validate from '@/middlewares/validate';
import StoreValidation from '@/validations/store';
import StoreController from '@/controller/v1/store';
import authenticate from '@/middlewares/authenticate';
import { ROLE } from '@/config/roles';

const router = express.Router();

router.get('/', validate(StoreValidation.getStores), StoreController.getStores);
router.post('/', validate(StoreValidation.createStore), StoreController.createStore);
router.patch('/:id', authenticate(ROLE.user), validate(StoreValidation.updateStore), StoreController.updateStore);
router.delete('/:id', authenticate(ROLE.user), validate(StoreValidation.deleteStore), StoreController.deleteStore);

export default router;
