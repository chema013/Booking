import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonZoneModule } from './common-zone/common-zone.module';
import { EdificeModule } from './edifice/edifice.module';
import { UserAdminModule } from './user-admin/user-admin.module';
import { UserResidentModule } from './user-resident/user-resident.module';
import { DepartmentModule } from './department/department.module';
import { ReservationModule } from './reservation/reservation.module';
import { AuthModule } from './auth/auth.module';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CommonZoneModule,
    EdificeModule,
    UserAdminModule,
    UserResidentModule,
    DepartmentModule,
    ReservationModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORMHOST,
      port: 3306,
      username: process.env.TYPEORMUSERNAME,
      password: process.env.TYPEORMPASSWORD,
      database: process.env.TYPEORMDATABASE,
      entities: [__dirname + './**/**/*entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: true,
      // logging: true,
      // logger: 'file',
    }),
    AccessControlModule.forRoles(roles),
    AuthModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
