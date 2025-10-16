/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';
export class CreateExpenseDto {
  @IsNotEmpty() title: string;
  @IsOptional() note?: string;
  @IsNumber() amount: number;
  @IsNotEmpty() categoryId: string;
  @IsDateString() date: string;
  @IsOptional() paymentMethod?: 'cash' | 'bkash' | 'card' | 'other';
  @IsOptional() tags?: string[];
}
