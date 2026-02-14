import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './ormconfig';
import { User } from './users/user.entity';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { TeachingEnvironment } from './teaching_environments/teaching_environment.entity';
import { TeachingEnvironmentService } from './teaching_environments/teaching_environment.service';
import { TeachingEnvironmentController } from './teaching_environments/teaching_environment.controller';
import { Student } from './students/student.entity';
import { StudentService } from './students/student.service';
import { StudentController } from './students/student.controller';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import * as cors from 'cors';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User, TeachingEnvironment, Student]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
  ],
  controllers: [UserController, TeachingEnvironmentController, StudentController],
  providers: [UserService, TeachingEnvironmentService, StudentService],
})
export class AppModule {
  configure(consumer: import('@nestjs/common').MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
