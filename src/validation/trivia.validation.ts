import { Types } from 'mongoose';
import { z } from 'zod';

class Validation {
  // Validation schema for answering trivia questions
  answer = {
    body: z.object({
      id: z.string().refine((value) => Types.ObjectId.isValid(value), {
        message: 'Invalid ObjectId format',
      }),
      answer: z.string().min(1).max(255),
    }),
  };
}

export const triviaValidation = new Validation();
