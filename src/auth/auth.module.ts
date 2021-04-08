import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserResidentModule } from 'src/user-resident/user-resident.module';
import { UserAdminModule } from 'src/user-admin/user-admin.module';
import { LocalStrategy } from './strategies';

@Module({
  imports: [
    PassportModule,
    UserResidentModule,
    UserAdminModule
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
