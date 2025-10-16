/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RecurringExpenseSchema } from './schema/recurring-expense.schema';
import { RecurringExpense } from './recurring.schema';
import { RecurringExpensesController } from './recurring-expenses.controller';
import { RecurringExpensesService } from './recurring-expenses.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RecurringExpense.name, schema: RecurringExpenseSchema },
    ]),
  ],
  controllers: [RecurringExpensesController],
  providers: [RecurringExpensesService],
})
export class RecurringExpensesModule {}
