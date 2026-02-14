import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { TeachingEnvironment } from './teaching_environment.entity';
import { TeachingEnvironmentService } from './teaching_environment.service';
import { CreateTeachingEnvironmentsDto } from './create_teaching_environment.dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@Controller('teaching-environments')
export class TeachingEnvironmentController {
  constructor(private readonly TeachingEnvironmentService: TeachingEnvironmentService) {}

  @UseGuards(AuthGuard('jwt'))
    @Get()
    async findAll(): Promise<{ teaching_environments: TeachingEnvironment[] }> {
      return {
        teaching_environments: await this.TeachingEnvironmentService.findAll(),
      };
    }

  @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() createTeachingEnvironmentsDto: CreateTeachingEnvironmentsDto) {
      const environment = await this.TeachingEnvironmentService.create(createTeachingEnvironmentsDto);
      return environment;
    }
}