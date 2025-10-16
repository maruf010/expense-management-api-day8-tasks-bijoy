/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Budget extends Document {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  userId: Types.ObjectId;
  @Prop({ required: true }) month: string; // YYYY-MM
  @Prop({ required: true }) limit: number;
  @Prop({ type: Types.ObjectId, default: null }) categoryId?: Types.ObjectId;
}
export const BudgetSchema = SchemaFactory.createForClass(Budget);
BudgetSchema.index({ userId: 1, month: 1, categoryId: 1 }, { unique: true });
