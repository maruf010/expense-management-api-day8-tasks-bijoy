/* eslint-disable prettier/prettier */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ReportsService } from './reports.service';
import { User } from '../users/schema/schemas/user.schema';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('summary')
  summary(@User('_id') userId, @Query('month') month: string) {
    return this.service.summary(userId, month);
  }
}
