import { Document, Types } from 'mongoose';

export default interface ITrivia extends Document {
  _id?: string | Types.ObjectId;
  text: string;
  options: string[];
  country: string;
  correctAnswer: string;
  deleted?: boolean;
}
