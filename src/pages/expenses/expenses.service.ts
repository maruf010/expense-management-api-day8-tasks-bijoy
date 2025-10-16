/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expense } from './schema/expense.schema';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private expModel: Model<Expense>,
    private cats: CategoriesService,
  ) {}

  async create(userId: string, dto: any) {
    // ensure category active
    const cat = await this.cats.findByIdForUser(userId, dto.categoryId);
    if (!cat) throw new BadRequestException('CATEGORY_INACTIVE');
    const doc = new this.expModel({
      userId: new Types.ObjectId(userId),
      title: dto.title,
      note: dto.note,
      amount: dto.amount,
      categoryId: new Types.ObjectId(dto.categoryId),
      date: new Date(dto.date),
      paymentMethod: dto.paymentMethod || 'cash',
      tags: dto.tags || [],
    });
    return doc.save();
  }

  async findAll(userId: string, query: any) {
    const q: any = { userId: new Types.ObjectId(userId), isDeleted: false };
    if (query.categoryId) q.categoryId = new Types.ObjectId(query.categoryId);
    if (query.minAmount || query.maxAmount) q.amount = {};
    if (query.minAmount) q.amount.$gte = Number(query.minAmount);
    if (query.maxAmount) q.amount.$lte = Number(query.maxAmount);
    if (query.paymentMethod) q.paymentMethod = query.paymentMethod;
    if (query.q)
      q.$or = [
        { title: { $regex: query.q, $options: 'i' } },
        { note: { $regex: query.q, $options: 'i' } },
      ];
    if (query.month) {
      const [y, m] = query.month.split('-').map(Number);
      const start = new Date(y, m - 1, 1);
      const end = new Date(y, m, 0, 23, 59, 59, 999);
      q.date = { $gte: start, $lte: end };
    }
    const page = Math.max(1, Number(query.page || 1));
    const pageSize = Math.min(100, Number(query.pageSize || 20));
    const sortField = query.sortBy === 'amount' ? 'amount' : 'date';
    const sortOrder = query.order === 'asc' ? 1 : -1;
    const docs = await this.expModel
      .find(q)
      .sort({ [sortField]: sortOrder })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .lean();
    return docs;
  }

  async update(userId: string, id: string, dto: any) {
    const exp = await this.expModel.findOne({
      _id: id,
      userId: new Types.ObjectId(userId),
      isDeleted: false,
    });
    if (!exp) throw new BadRequestException('Expense not found');
    if (dto.title) exp.title = dto.title;
    if (dto.amount) exp.amount = dto.amount;
    if (dto.categoryId) {
      const cat = await this.cats.findByIdForUser(userId, dto.categoryId);
      if (!cat) throw new BadRequestException('CATEGORY_INACTIVE');
      exp.categoryId = new Types.ObjectId(dto.categoryId);
    }
    if (dto.date) exp.date = new Date(dto.date);
    if (dto.paymentMethod) exp.paymentMethod = dto.paymentMethod;
    if (dto.tags) exp.tags = dto.tags;
    return exp.save();
  }

  async softDelete(userId: string, id: string) {
    const exp = await this.expModel.findOne({
      _id: id,
      userId: new Types.ObjectId(userId),
      isDeleted: false,
    });
    if (!exp) throw new BadRequestException('Expense not found');
    exp.isDeleted = true;
    return exp.save();
  }

  // CSV export - streams to res
  async exportCsv(userId: string, month: string, res: any) {
    if (!month) {
      res.status(400).json({ success: false, error: 'month required' });
      return;
    }
    const [y, m] = month.split('-').map(Number);
    const start = new Date(y, m - 1, 1);
    const end = new Date(y, m, 0, 23, 59, 59, 999);
    const cursor = this.expModel
      .find({
        userId: new Types.ObjectId(userId),
        date: { $gte: start, $lte: end },
        isDeleted: false,
      })
      .cursor();
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="expenses-${month}.csv"`,
    );
    res.setHeader('Content-Type', 'text/csv');
    res.write('date,title,amount,categoryId,paymentMethod\\n');
    for await (const d of cursor) {
      res.write(
        `${d.date.toISOString()},"${(d.title || '').replace(/"/g, '""')}",${d.amount},${d.categoryId},${d.paymentMethod}\\n`,
      );
    }
    res.end();
  }
}
