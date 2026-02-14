import { Controller, Get, Param, NotFoundException, Post, Body, Request, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.entity';
import { CreateStudentDto } from './create_student.dto';
import { UpdateStudentDto } from './update_student.dto';
import { UseEnvironmentDto } from './use_environment_dto';
import { AuthGuard } from '@nestjs/passport';
import { UseGuards } from '@nestjs/common';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService    
  ) {}

  @UseGuards(AuthGuard('jwt'))
    @Get()
      async findAll(): Promise<{ students: Student[] }> {
        return {
          students: await this.studentService.findAll(),
        };
    }

  @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    async findOne(
      @Param('id', ParseIntPipe) id: number
    ): Promise<Student> {
      const student = await this.studentService.findOneById(id);

      if (!student) {
        throw new NotFoundException('Student not found');
      }

      return student;
    }


  @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() createStudentDto: CreateStudentDto) {
      const student = await this.studentService.create(createStudentDto);
      return student;
    } 

  @UseGuards(AuthGuard('jwt'))
    @Put('')
    async update(
      @Body() updateStudentDto: UpdateStudentDto
    ): Promise<Student> {
      const { id } = updateStudentDto;

      const updated = await this.studentService.update(id, updateStudentDto);

      if (!updated) {
        throw new NotFoundException('Student not found');
      }

      return updated;
    }

  @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(
      @Param('id', ParseIntPipe) id: number
    ): Promise<{ message: string }> {
      const deleted = await this.studentService.remove(id);

      if (!deleted) {
        throw new NotFoundException('Student not found');
      }

      return { message: 'Student deleted successfully' };
    }

  @UseGuards(AuthGuard('jwt'))
   @Post('use_environment')
    async appendEnvironment(
      @Body() dto: UseEnvironmentDto
    ) {
      return await this.studentService.addEnvironmentToStudent(
        dto.studentId,
        dto.environmentId,
      );
    }

  @UseGuards(AuthGuard('jwt'))
    @Get(':id/teaching_environments')
    async getStudentEnvironments(@Param('id', ParseIntPipe) id: number) {
      const student = await this.studentService.findStudentWithEnvironments(id);

      if (!student) {
        throw new NotFoundException('Student not found');
      }

      return student.teachingEnvironments;
    }

  @UseGuards(AuthGuard('jwt'))
    @Delete(':studentId/teaching_environments/:environmentId')
    async removeEnvironment(
      @Param('studentId', ParseIntPipe) studentId: number,
      @Param('environmentId', ParseIntPipe) environmentId: number,
    ) {
      return await this.studentService.removeEnvironmentFromStudent(
        studentId,
        environmentId,
      );
    }
}
