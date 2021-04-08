import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsString } from "class-validator";

export class CreateCommonZoneDto {

    @ApiProperty({ example: 'Estacionamiento', description: 'Number of department' })
    @IsString()
    name: string;

    @ApiProperty({ example: true, description: 'State, can be true or false' })
    @IsBoolean()
    booking : boolean;

    @ApiProperty({ example: [], description: 'Number of reservations, start must be []' })
    @IsArray()
    reservations?: number[];
}
