import { Router } from 'express';
const router = Router();
import { triviaController } from '../../../controllers';
import { triviaValidation } from '../../../validation';
import { processRequestBody } from 'zod-express-middleware';

//get a trivia question
router.get('/', triviaController.getOne);

//answer a trivia question
router.post(
  '/answer',
  processRequestBody(triviaValidation.answer.body),
  triviaController.answerOne,
);

export default router;
