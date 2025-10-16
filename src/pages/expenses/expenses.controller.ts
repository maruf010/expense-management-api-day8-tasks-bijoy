/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  Query,
  Put,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('expenses')
export class ExpensesController {
  constructor(private exp: ExpensesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@GetUser() user, @Body() dto: CreateExpenseDto) {
    return this.exp.create(user._id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  all(@GetUser() user, @Query() q) {
    return this.exp.findAll(user._id, q);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @GetUser() user,
    @Param('id') id: string,
    @Body() dto: UpdateExpenseDto,
  ) {
    return this.exp.update(user._id, id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@GetUser() user, @Param('id') id: string) {
    return this.exp.softDelete(user._id, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('export/csv')
  exportCsv(@GetUser() user, @Query('month') month: string, @Res() res) {
    return this.exp.exportCsv(user._id, month, res);
  }
}
