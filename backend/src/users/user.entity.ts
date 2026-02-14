import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TeachingEnvironment } from '../teaching_environments/teaching_environment.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
