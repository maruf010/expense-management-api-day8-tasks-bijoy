/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';
export class UpdateCategoryDto {
  @IsOptional() name?: string;
  @IsOptional() color?: string;
  @IsOptional() icon?: string;
}
