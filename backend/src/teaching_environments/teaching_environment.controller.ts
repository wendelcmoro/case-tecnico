import { Controller, Get, Query } from '@nestjs/common';
import { TeachingEnvironment } from './teaching_environment.entity';
import { TeachingEnvironmentService } from './teaching_environment.service';

@Controller('TeachingEnvironments')
export class TeachingEnvironmentController {
  constructor(private readonly TeachingEnvironmentService: TeachingEnvironmentService) {}

  @Get()
  async findAll(): Promise<TeachingEnvironment[]> {
    return await this.TeachingEnvironmentService.findAll();
  }

  @Get('/teaching-environments')
  async getTeachingEnvironmentsPerMonth(
    @Query('year')
    year?: number,
    @Query('status')
    status?: number,
    @Query('date_filter')
    date_filter?: number,
  ): Promise<{ month: number; count: number }[]> {
    return this.TeachingEnvironmentService.getTeachingEnvironmentsPerMonth(
      year,
      status,
      date_filter,
    );
  }
}