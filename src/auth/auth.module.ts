import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserResidentModule } from 'src/user-resident/user-resident.module';
import { UserAdminModule } from 'src/user-admin/user-admin.module';
import { LocalStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'myStrongSecret',
      signOptions: { expiresIn: '60m'}
    }),
    UserResidentModule,
    UserAdminModule
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
