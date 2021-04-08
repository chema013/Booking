import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

import { CommonZone } from "src/common-zone/entities/common-zone.entity";
import { UserResident } from "src/user-resident/entities/user-resident.entity";

export class CreateReservationDto {

    @ApiProperty({ example: '2021-04-07 17:30:00', description: 'Format Valid yyyy-mm-dd hh:mm:ss '  })
    @IsString()
    start: string;

    @ApiProperty({ example: '2021-04-07 18:30:00', description: 'Format Valid yyyy-mm-dd hh:mm:ss '  })
    @IsString()
    finish: string;

    @ApiProperty({ example: 2 })
    @IsNumber()
    userResidentId: number;

    @ApiProperty({ example: 1 })
    @IsNumber()
    commonZoneId: number;

    userResident: UserResident;
    commonZone: CommonZone;
}
