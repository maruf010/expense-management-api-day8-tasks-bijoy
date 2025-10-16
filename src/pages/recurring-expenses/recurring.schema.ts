/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class RecurringExpense extends Document {
  @Prop({ type: Types.ObjectId, required: true }) userId: Types.ObjectId;
  @Prop({ required: true }) title: string;
  @Prop({ required: true }) amount: number;
  @Prop({ type: Types.ObjectId, required: true }) categoryId: Types.ObjectId;
  @Prop({ enum: ['daily', 'weekly', 'monthly'], required: true })
  cadence: string;
  @Prop({ type: Date, required: true }) startDate: Date;
  @Prop({ type: Date }) endDate?: Date;
  @Prop({ type: Date }) nextRunDate?: Date;
}
export const RecurringSchema = SchemaFactory.createForClass(RecurringExpense);
