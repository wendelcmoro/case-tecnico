import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';
import { Student } from '../students/student.entity';

enum Type {
  CLASSROOM = 'CLASSROOM',
  LABORATORY = 'LABORATORY',
  STUDY_ROOM = 'STUDY_ROOM',
}

@Entity({ name: 'teaching_environments' })
export class TeachingEnvironment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Type, default: Type.CLASSROOM })
  type: string;

  @ManyToMany(
    () => Student,
    (student) => student.teachingEnvironments
  )
  students: Student[];
}
