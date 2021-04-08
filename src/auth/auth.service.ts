import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';

import { UserAdminService } from 'src/user-admin/user-admin.service';
import { UserResidentService } from 'src/user-resident/user-resident.service';
import { UserResident } from 'src/user-resident/entities/user-resident.entity';
import { UserAdmin } from 'src/user-admin/entities/user-admin.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userAdminService: UserAdminService,
        private readonly userResidentService: UserResidentService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userResidentService.findByUsername( {username} );

        if(user && (await compare(pass, user.password))){
            const { password, ...rest } = user;
            return rest;
        }

        return null;
    }

    login(user: UserResident) {
        const { id, ...rest } = user;
        const payload = { sub: id };

        return {
            user,
            accessToken: this.jwtService.sign(payload)
        }
    }

    //////////////////////

    async validateUserAdmin(username: string, pass: string): Promise<any> {
        const user = await this.userAdminService.findByUsername( {username} );
        // console.log(user);
        if(user && (await compare(pass, user.password))){
            const { password, ...rest } = user;
            // console.log(rest);
            return rest;
        }

        return null;
    }

    loginAdmin(user: UserAdmin) {
        const { id, ...rest } = user;
        const payload = { sub: id };

        return {
            user,
            accessToken: this.jwtService.sign(payload)
        }
    }

}
