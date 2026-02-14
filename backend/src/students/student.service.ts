import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { TeachingEnvironment } from '../teaching_environments/teaching_environment.entity';
import { CreateStudentDto } from './create_student.dto';
import { UpdateStudentDto } from './update_student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,

    @InjectRepository(TeachingEnvironment)
    private readonly teachingEnvironmentRepository: Repository<TeachingEnvironment>,
  ) {}

  async findOneById(id: number): Promise<Student | undefined> {
    return await this.studentRepository.findOne({ where: { id: id }, select: ['id', 'name'] });
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }


  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create({
      ...createStudentDto,
    });

    return this.studentRepository.save(student);
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto
  ): Promise<Student | null> {

    const result = await this.studentRepository.update(id, updateStudentDto);

    if (!result.affected) {
      return null;
    }

    return await this.studentRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number): Promise<boolean> {
    const student = await this.studentRepository.findOne({
      where: { id },
    });

    if (!student) {
      return false;
    }

    await this.studentRepository.delete(id);
    return true;
  }

  async addEnvironmentToStudent(
    studentId: number,
    environmentId: number,
  ): Promise<any> {

    const student = await this.studentRepository.findOne({
      where: { id: studentId },
      relations: ['teachingEnvironments'],
    });

    if (!student) {
      return 'Student not found';
    }

    const environment = await this.teachingEnvironmentRepository.findOne({
      where: { id: environmentId },
    });

    if (!environment) {
      return  'Teaching environment not found';
    }

    const alreadyAdded = student.teachingEnvironments.some(
      env => env.id === environment.id,
    );

    if (!alreadyAdded) {
      student.teachingEnvironments.push(environment);
    }

    return await this.studentRepository.save(student);
  }
}
