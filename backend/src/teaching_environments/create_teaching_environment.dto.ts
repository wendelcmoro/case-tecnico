import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateTeachingEnvironmentsDto {
    @IsNotEmpty({ message: 'name is required' })
    name: string;

    @IsNotEmpty({ message: 'type is required' })
    type: string;
}
