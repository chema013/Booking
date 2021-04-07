import { Module } from '@nestjs/common';
import { UserResidentService } from './user-resident.service';
import { UserResidentController } from './user-resident.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserResident } from './entities/user-resident.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Department } from 'src/department/entities/department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserResident, Department, Reservation])
  ],
  controllers: [UserResidentController],
  providers: [UserResidentService]
})
export class UserResidentModule {}
