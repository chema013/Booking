import { IsArray, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { AppRoles } from 'src/app.roles';

export class CreateUserAdminDto {
    @IsString()
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password: string;

    @IsArray()
    @IsEnum(AppRoles, {
    each: true,
    message: `must be a valid role value, [RESIDENT, ADMIN]`,
    })
    roles: string[];
}
