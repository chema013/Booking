import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserResidentService } from 'src/user-resident/user-resident.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
      private userService: UserResidentService
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
}