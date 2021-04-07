import { IsArray, IsString } from 'class-validator';

export class CreateUserResidentDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    role: string;

    @IsArray()
    departments: any[];
}
