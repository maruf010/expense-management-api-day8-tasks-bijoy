/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@UseGuards(JwtAuthGuard)
@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  create(@GetUser('_id') userId, @Body() dto: CreateBudgetDto) {
    return this.budgetsService.create(userId, dto);
  }

  @Get()
  findAll(@GetUser('_id') userId, @Query('month') month: string) {
    return this.budgetsService.findAll(userId, month);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @GetUser('_id') userId,
    @Body() dto: UpdateBudgetDto,
  ) {
    return this.budgetsService.update(id, userId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('_id') userId) {
    return this.budgetsService.remove(id, userId);
  }
}
