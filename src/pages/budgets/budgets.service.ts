/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Budget } from './schema/budget.schema';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetsService {
  constructor(@InjectModel(Budget.name) private budgetModel: Model<Budget>) {}

  async create(userId: Types.ObjectId, dto: CreateBudgetDto) {
    try {
      const budget = await this.budgetModel.create({ ...dto, userId });
      return budget;
    } catch (err) {
      if (err.code === 11000)
        throw new ConflictException('Duplicate budget for this month/category');
      throw err;
    }
  }

  async findAll(userId: Types.ObjectId, month?: string) {
    const query: any = { userId };
    if (month) query.month = month;
    return this.budgetModel.find(query).lean();
  }

  async update(id: string, userId: Types.ObjectId, dto: UpdateBudgetDto) {
    const budget = await this.budgetModel.findOneAndUpdate(
      { _id: id, userId },
      dto,
      { new: true },
    );
    if (!budget) throw new NotFoundException('Budget not found');
    return budget;
  }

  async remove(id: string, userId: Types.ObjectId) {
    const res = await this.budgetModel.findOneAndDelete({ _id: id, userId });
    if (!res) throw new NotFoundException('Budget not found');
    return { message: 'Budget deleted' };
  }
}
