/* eslint-disable prettier/prettier */
import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { RecurringJobService } from '../pages/recurring-expenses/recurring-job.service';

async function runOnce() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const job = app.get(RecurringJobService);
  await job.processDue(new Date());
  console.log('Recurring run once completed');
  await app.close();
}
runOnce();
