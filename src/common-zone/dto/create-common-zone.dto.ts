import { IsArray, IsBoolean, IsString } from "class-validator";

export class CreateCommonZoneDto {

    @IsString()
    name: string;

    @IsBoolean()
    booking : boolean;

    @IsArray()
    reservations?: number[];
}
