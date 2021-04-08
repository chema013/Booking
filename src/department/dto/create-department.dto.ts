import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";

export class CreateDepartmentDto {

    @ApiProperty({ example: 1, description: 'Number of department' })
    @IsNumber()
    number: number;

    @ApiProperty({ example: 1, description: 'Number of floor' })
    @IsNumber()
    floor: number;

    @ApiProperty({ example: [], description: 'Residents Id, it is optional, can be []' })
    @IsArray()
    residents: any[];
}
