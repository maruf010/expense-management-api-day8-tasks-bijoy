/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Upload extends Document {
  @Prop({ type: Types.ObjectId, required: true }) userId: Types.ObjectId;
  @Prop({ required: true }) filename: string;
  @Prop({ required: true }) mime: string;
  @Prop({ required: true }) size: number;
  @Prop() url?: string;
}
export const UploadSchema = SchemaFactory.createForClass(Upload);
