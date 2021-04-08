import { Injectable } from '@nestjs/common';
import { UserAdminService } from 'src/user-admin/user-admin.service';
import { UserResidentService } from 'src/user-resident/user-resident.service';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {

    constructor(
        private readonly userAdminService: UserAdminService,
        private readonly userResidentService: UserResidentService,
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userResidentService.findByUsername( {username} );

        console.log(user);

        if(user && (await compare(pass, user.password))){
            return user;
        }

        return null;
    }
}
