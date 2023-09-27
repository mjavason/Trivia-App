import mongoose, { Document, Types } from 'mongoose';

// Define the interface
export default interface ITransaction extends Document {
  _id?: string | Types.ObjectId;
  from_account: Types.ObjectId;
  to_account: Types.ObjectId;
  amount: number;
  description: string;
  deleted?: boolean;
}
