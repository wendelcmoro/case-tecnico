import { IsInt, IsNotEmpty } from 'class-validator';

export class UseEnvironmentDto {

  @IsNotEmpty()
  studentId: number;

  @IsNotEmpty()
  environmentId: number;
}