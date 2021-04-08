import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserResidentService } from 'src/user-resident/user-resident.service';
import { UserAdminService } from 'src/user-admin/user-admin.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private userService: UserResidentService,
      private userAdminService: UserAdminService
      ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'myStrongSecret',
    });
  }

  async validate(payload: any) {
    const { sub: id } = payload;
    return await this.userService.findOne(id);
  }

  async validateAdmin(payload: any) {
    const { sub: id } = payload;
    return await this.userAdminService.findOne(id);
  }
}