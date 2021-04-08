import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { User } from 'src/common/decorators';
import { UserResident } from 'src/user-resident/entities/user-resident.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@User() user: UserResident) {
        return user;
    }

    @Get('profile')
    profile() {
        return 'Estos son tu datos';
    }
}
