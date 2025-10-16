/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecurringExpense } from './recurring.schema';

@Injectable()
export class RecurringJobService {
  constructor(
    @InjectModel(RecurringExpense.name)
    private recurringModel: Model<RecurringExpense>,
  ) {}

  async processDue(now: Date) {
    const due = await this.recurringModel
      .find({
        nextRunDate: { $lte: now },
        $or: [{ endDate: { $exists: false } }, { endDate: { $gte: now } }],
      })
      .lean();

    for (const rec of due) {
      // Create expense logic would go here
      // For now, just update nextRunDate
      const next = this.calculateNextRunDate(rec.nextRunDate || rec.startDate, rec.cadence);
      await this.recurringModel.updateOne(
        { _id: rec._id },
        { $set: { nextRunDate: next } },
      );
    }

    return { processed: due.length };
  }

  private calculateNextRunDate(current: Date, cadence: string): Date {
    const next = new Date(current);
    switch (cadence) {
      case 'daily':
        next.setDate(next.getDate() + 1);
        break;
      case 'weekly':
        next.setDate(next.getDate() + 7);
        break;
      case 'monthly':
        next.setMonth(next.getMonth() + 1);
        break;
    }
    return next;
  }
}
