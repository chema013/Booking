import { IsString } from 'class-validator';

export class CreateUserAdminDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    role: string;
}
