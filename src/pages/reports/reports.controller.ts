/* eslint-disable prettier/prettier */
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ReportsService } from './reports.service';
import { GetUser } from 'src/decorators/get-user.decorator';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Get('summary')
  summary(@GetUser('_id') userId, @Query('month') month: string) {
    return this.service.summary(userId, month);
  }
}
