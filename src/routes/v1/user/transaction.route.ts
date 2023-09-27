import { Router } from 'express';
const router = Router();
import { transactionController } from '../../../controllers';

//get transactions with pagination
router.get('/:pagination', transactionController.getAll);

export default router;
