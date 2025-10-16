/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Expense extends Document {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  userId: Types.ObjectId;
  @Prop({ required: true }) title: string;
  @Prop() note?: string;
  @Prop({ required: true }) amount: number;
  @Prop({ type: Types.ObjectId, required: true, index: true })
  categoryId: Types.ObjectId;
  @Prop({ type: Date, required: true, index: true }) date: Date;
  @Prop({ enum: ['cash', 'bkash', 'card', 'other'], default: 'cash' })
  paymentMethod: string;
  @Prop([String]) tags?: string[];
  @Prop({ type: Object }) receipt?: {
    fileId?: string;
    url?: string;
    mime?: string;
    size?: number;
  };
  @Prop({ default: false }) isDeleted: boolean;
}
export const ExpenseSchema = SchemaFactory.createForClass(Expense);
ExpenseSchema.index({ userId: 1, date: -1 });
ExpenseSchema.index({ date: -1 });
ExpenseSchema.index({ categoryId: 1 });
