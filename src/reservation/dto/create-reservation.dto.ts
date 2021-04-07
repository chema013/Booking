import { IsNumber, IsString } from "class-validator";

import { CommonZone } from "src/common-zone/entities/common-zone.entity";
import { UserResident } from "src/user-resident/entities/user-resident.entity";

export class CreateReservationDto {

    @IsString()
    start: string;

    @IsString()
    finish: string;

    @IsNumber()
    userResidentId: number;

    @IsNumber()
    commonZoneId: number;

    userResident: UserResident;
    commonZone: CommonZone;
}
