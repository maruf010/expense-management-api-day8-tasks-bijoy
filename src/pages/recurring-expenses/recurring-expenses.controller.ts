/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RecurringExpensesService } from './recurring-expenses.service';
import { GetUser } from 'src/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('recurring-expenses')
export class RecurringExpensesController {
  constructor(private readonly service: RecurringExpensesService) {}

  @Post()
  create(@GetUser('_id') userId, @Body() dto) {
    return this.service.create(userId, dto);
  }

  @Get()
  findAll(@GetUser('_id') userId) {
    return this.service.findAll(userId);
  }

  @Put(':id')
  update(@Param('id') id: string, @GetUser('_id') userId, @Body() dto) {
    return this.service.update(id, userId, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('_id') userId) {
    return this.service.remove(id, userId);
  }
}
