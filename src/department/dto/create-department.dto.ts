import { IsArray, IsNumber } from "class-validator";

export class CreateDepartmentDto {

    @IsNumber()
    number: number;

    @IsNumber()
    floor: number;

    @IsArray()
    residents: any[];
}
