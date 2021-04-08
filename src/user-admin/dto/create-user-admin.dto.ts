import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserAdminDto {
    @IsString()
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password: string;

    @IsString()
    role: string;
}
