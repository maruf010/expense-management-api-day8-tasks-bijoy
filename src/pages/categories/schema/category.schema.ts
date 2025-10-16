/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Category extends Document {
  @Prop({ type: Types.ObjectId, required: true, index: true })
  userId: Types.ObjectId;
  @Prop({ required: true }) name: string;
  @Prop({ required: true }) slug: string;
  @Prop() color?: string;
  @Prop() icon?: string;
  @Prop({ default: false }) isDeleted: boolean;
  @Prop() deletedAt?: Date;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
CategorySchema.index({ userId: 1, slug: 1 }, { unique: true });
