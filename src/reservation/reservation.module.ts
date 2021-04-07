import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reservation } from './entities/reservation.entity';
import { UserResident } from 'src/user-resident/entities/user-resident.entity';
import { CommonZone } from 'src/common-zone/entities/common-zone.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, UserResident, CommonZone])
  ],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
