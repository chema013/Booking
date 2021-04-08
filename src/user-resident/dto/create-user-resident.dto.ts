import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsString } from 'class-validator';
import { AppRoles } from 'src/app.roles';

export class CreateUserResidentDto {
    @ApiProperty({ example: 'UserTest1' })
    @IsString()
    username: string;

    @ApiProperty({ example: '12345678' })
    @IsString()
    password: string;

    @ApiProperty({ example: ['RESIDENT'], description: 'Only put an role array valid [RESIDENT] or [ADMIN]'  })
    @IsArray()
    @IsEnum(AppRoles, {
    each: true,
    message: `must be a valid role value, [RESIDENT, ADMIN]`,
    })
    roles: string[];

    @ApiProperty({ example: [1], description: 'Only put an id of department valid' })
    @IsArray()
    departments: any[];
}
