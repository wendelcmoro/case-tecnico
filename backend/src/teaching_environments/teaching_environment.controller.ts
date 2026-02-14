import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { TeachingEnvironment } from './teaching_environment.entity';
import { TeachingEnvironmentService } from './teaching_environment.service';
import { CreateTeachingEnvironmentsDto } from './create_teaching_environment.dto';

@Controller('teaching-environments')
export class TeachingEnvironmentController {
  constructor(private readonly TeachingEnvironmentService: TeachingEnvironmentService) {}

  @Get()
  async findAll(): Promise<TeachingEnvironment[]> {
    return await this.TeachingEnvironmentService.findAll();
  }

  @Post()
  async create(@Body() createTeachingEnvironmentsDto: CreateTeachingEnvironmentsDto) {
    const environment = await this.TeachingEnvironmentService.create(createTeachingEnvironmentsDto);
    return environment;
  }
}