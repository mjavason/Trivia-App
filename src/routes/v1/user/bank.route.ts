import { Router, Request, Response } from 'express';
const router = Router();
import {
  processRequestBody,
  processRequestParams,
  processRequestQuery,
} from 'zod-express-middleware';
import { bankController } from '../../../controllers';
import { bankValidation } from '../../../validation';
import { SuccessMsgResponse } from '../../../helpers/response';
import { MESSAGES } from '../../../constants';

// router.get('/', (req: Request, res: Response) => SuccessMsgResponse(res, MESSAGES.DEFAULT));

//create account (one only)
router.post('/',  bankController.create);

// fund bank account
router.post('/fund', processRequestBody(bankValidation.fund.body), bankController.fund);

//transfer funds to another bank account
router.post('/transfer', processRequestBody(bankValidation.transfer.body), bankController.transfer);

//get bank details for logged in user
router.get('/', bankController.getBankDetails);

export default router;
