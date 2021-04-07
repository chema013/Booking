import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Department } from './entities/department.entity';
import { UserResident } from 'src/user-resident/entities/user-resident.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserResident, Department])
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService]
})
export class DepartmentModule {}
