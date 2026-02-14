import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { TeachingEnvironment } from './teaching_environment.entity';
import { CreateTeachingEnvironmentsDto } from './create_teaching_environment.dto';

@Injectable()
export class TeachingEnvironmentService {
  constructor(
    @InjectRepository(TeachingEnvironment)
    private teachingEnvironmentRepository: Repository<TeachingEnvironment>,
    @InjectEntityManager()
    private entityManager: EntityManager,
  ) {}

  async create(createTeachingEnvironmentsDto: CreateTeachingEnvironmentsDto): Promise<TeachingEnvironment> {

    const user = this.teachingEnvironmentRepository.create({
      ...createTeachingEnvironmentsDto,
    });

    return this.teachingEnvironmentRepository.save(user);
  }

  async findAll(): Promise<TeachingEnvironment[]> {
    return await this.teachingEnvironmentRepository.find();
  }
}
