/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './pages/users/users.module';
import { CategoriesModule } from './pages/categories/categories.module';
import { ExpensesModule } from './pages/expenses/expenses.module';
import { RecurringExpense } from './pages/recurring-expenses/recurring.schema';
import { BudgetsModule } from './pages/budgets/budgets.module';
import { RecurringExpensesModule } from './pages/recurring-expenses/recurring-expenses.module';
import { ReportsModule } from './pages/reports/reports.module';
import { UploadsModule } from './pages/uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ExpensesModule,
    BudgetsModule,
    RecurringExpensesModule,
    ReportsModule,
    UploadsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
