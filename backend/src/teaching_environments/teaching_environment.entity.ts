import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

enum Type {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  DEMO_CANCELED = 'DEMO_CANCELED',
}

@Entity({ name: 'teaching_environments' })
export class TeachingEnvironment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity_of_charges: number;

  @Column()
  charge_period: number;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'enum', enum: Type, default: Type.ACTIVE })
  type: string;

  // Relação N:1
  @ManyToOne(() => User, (user) => user.teachingEnvironments)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;
}
