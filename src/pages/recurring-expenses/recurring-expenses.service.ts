/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { RecurringExpense } from './recurring.schema';

@Injectable()
export class RecurringExpensesService {
  constructor(
    @InjectModel(RecurringExpense.name) private model: Model<RecurringExpense>,
  ) {}

  async create(userId: Types.ObjectId, dto) {
    return this.model.create({ ...dto, userId });
  }

  async findAll(userId: Types.ObjectId) {
    return this.model.find({ userId }).lean();
  }

  async update(id: string, userId: Types.ObjectId, dto) {
    return this.model.findOneAndUpdate({ _id: id, userId }, dto, { new: true });
  }

  async remove(id: string, userId: Types.ObjectId) {
    return this.model.findOneAndDelete({ _id: id, userId });
  }
}
