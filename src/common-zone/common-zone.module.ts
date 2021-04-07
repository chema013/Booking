import { Module } from '@nestjs/common';
import { CommonZoneService } from './common-zone.service';
import { CommonZoneController } from './common-zone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommonZone } from './entities/common-zone.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommonZone, Reservation])
  ],
  controllers: [CommonZoneController],
  providers: [CommonZoneService]
})
export class CommonZoneModule {}
