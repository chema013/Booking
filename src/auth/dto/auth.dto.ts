import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
    @ApiProperty({ example: 'UserTest1' })
    @IsString()
    username: string;

    @ApiProperty({ example: '12345678' })
    @IsString()
    password: string;

}
