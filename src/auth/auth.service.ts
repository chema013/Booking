import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcryptjs';

import { UserAdminService } from 'src/user-admin/user-admin.service';
import { UserResidentService } from 'src/user-resident/user-resident.service';
import { UserResident } from 'src/user-resident/entities/user-resident.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userAdminService: UserAdminService,
        private readonly userResidentService: UserResidentService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userResidentService.findByUsername( {username} );

        console.log(user);

        if(user && (await compare(pass, user.password))){
            return user;
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
}
