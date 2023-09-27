import { Schema, model } from 'mongoose';
import { DATABASES } from '../../constants';
import ITrivia from '../../interfaces/trivia.interface';

const TriviaSchema = new Schema<ITrivia>(
  {
    text: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    correctAnswer: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

const TriviaModel = model<ITrivia>(DATABASES.TRIVIA, TriviaSchema);

export default TriviaModel;
