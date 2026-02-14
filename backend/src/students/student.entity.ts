import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, } from 'typeorm';
import { TeachingEnvironment } from '../teaching_environments/teaching_environment.entity';

@Entity({ name: 'students' })
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    () => TeachingEnvironment,
    (environment) => environment.students,
    { cascade: true }
  )
  @JoinTable()
  teachingEnvironments: TeachingEnvironment[];
}
