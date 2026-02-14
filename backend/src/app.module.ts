import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './ormconfig';
import { User } from './users/user.entity';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';
import { TeachingEnvironment } from './teaching_environments/teaching_environment.entity';
import { TeachingEnvironmentService } from './teaching_environments/teaching_environment.service';
import { TeachingEnvironmentController } from './teaching_environments/teaching_environment.controller';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import * as cors from 'cors';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    TypeOrmModule.forFeature([User, TeachingEnvironment]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    AuthModule,
  ],
  controllers: [UserController, TeachingEnvironmentController],
  providers: [UserService, TeachingEnvironmentService],
})
export class AppModule {
  configure(consumer: import('@nestjs/common').MiddlewareConsumer) {
    consumer.apply(cors()).forRoutes('*');
  }
}
