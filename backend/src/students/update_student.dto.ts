import { IsNotEmpty } from 'class-validator';

export class UpdateStudentDto {
    @IsNotEmpty({ message: 'Id is required' })
    id: number;

    @IsNotEmpty({ message: 'Name is required' })
    name: string;
}
