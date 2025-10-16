/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expense } from '../expenses/schema/expense.schema';
import { Budget } from '../budgets/schema/budget.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Expense.name) private expenseModel: Model<Expense>,
    @InjectModel(Budget.name) private budgetModel: Model<Budget>,
  ) {}

  async summary(userId: Types.ObjectId, month: string) {
    const [year, m] = month.split('-');
    const start = new Date(`${year}-${m}-01`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);

    const [expenses, budgets] = await Promise.all([
      this.expenseModel.aggregate([
        { $match: { userId, date: { $gte: start, $lt: end } } },
        {
          $group: {
            _id: '$categoryId',
            total: { $sum: '$amount' },
            count: { $sum: 1 },
          },
        },
      ]),
      this.budgetModel.find({ userId, month }).lean(),
    ]);

    return { month, expenses, budgets };
  }
}
