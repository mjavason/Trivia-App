import express from 'express';
const router = express.Router();
import bankRoute from './bank.route';
import transactionRoute from './transaction.route';
import isAuth from '../../../middleware/is_auth.middleware';

router.use(isAuth);
router.use('/bank/transaction', transactionRoute);
router.use('/bank', bankRoute);

export default router;
