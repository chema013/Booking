import { IsArray, IsEnum, IsString } from 'class-validator';
import { AppRoles } from 'src/app.roles';

export class CreateUserResidentDto {
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsArray()
    @IsEnum(AppRoles, {
    each: true,
    message: `must be a valid role value, [RESIDENT, ADMIN]`,
    })
    roles: string[];

    @IsArray()
    departments: any[];
}
