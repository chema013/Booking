import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy} from '@nestjs/passport';
import { Strategy} from 'passport-local';

import { UserAdminService } from "src/user-admin/user-admin.service";
import { UserResidentService } from "src/user-resident/user-resident.service";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userAdminService: UserAdminService,
        private readonly userResidentService: UserResidentService,
        private readonly authService: AuthService
    ) {
        super({
            usernameField: 'username',
            passwordField: 'password'
        })
    }

    async validate(username: string, password: string) {
        const user = await this.authService.validateUser(username, password);
        const userAdmin = await this.authService.validateUserAdmin(username, password);
        if(!user && !userAdmin) throw new UnauthorizedException('Login username or password does not match');
        if(user){
            return user;
        }
        else if (userAdmin){
            return userAdmin;
        }
    }

}