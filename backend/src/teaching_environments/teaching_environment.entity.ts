import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

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
}
