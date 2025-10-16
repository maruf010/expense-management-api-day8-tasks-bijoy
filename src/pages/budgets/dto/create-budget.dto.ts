/* eslint-disable prettier/prettier */
import { IsString, IsNumber, IsOptional, IsMongoId } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  month: string;

  @IsNumber()
  limit: number;

  @IsOptional()
  @IsMongoId()
  categoryId?: string;
}
