import { Document } from 'mongoose';

export default interface IDemo extends Document {
  _id?: string;
  message: string;
  title?: string;
  user_type?: 'admin' | 'user';
}
