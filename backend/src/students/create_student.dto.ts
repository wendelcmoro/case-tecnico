import { IsNotEmpty } from 'class-validator';

export class CreateStudentDto {
    @IsNotEmpty({ message: 'Name is required' })
    name: string;
}
