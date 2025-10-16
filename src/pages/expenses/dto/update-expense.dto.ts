/* eslint-disable prettier/prettier */
import { IsOptional, IsNumber, IsDateString } from 'class-validator';
export class UpdateExpenseDto {
  @IsOptional() title?: string;
  @IsOptional() note?: string;
  @IsOptional() @IsNumber() amount?: number;
  @IsOptional() categoryId?: string;
  @IsOptional() @IsDateString() date?: string;
  @IsOptional() paymentMethod?: 'cash' | 'bkash' | 'card' | 'other';
}
