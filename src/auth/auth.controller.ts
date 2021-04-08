import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { User } from 'src/common/decorators';
import { UserAdmin } from 'src/user-admin/entities/user-admin.entity';
import { UserResident } from 'src/user-resident/entities/user-resident.entity';
import { AuthService } from './auth.service';
import { LocalAuthGuard, JwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@User() user: UserResident) {
        const data = await this.authService.login(user)
        return {
            message: 'Login Successful',
            data
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    profile(@User() user: UserResident) {
        return {
            message: 'Request valid',
            user
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('refresh')
    refreshToken(@User() user: UserResident) {
        const data = this.authService.loginAdmin(user);
        return {
            message: 'Refresh Successful',
            data
        }
    }
//////////////////////////////////////////

    @UseGuards(LocalAuthGuard)
    @Post('loginAdmin')
    async loginAdmin(@User() user: UserAdmin) {
        const data = await this.authService.loginAdmin(user)
        return {
            message: 'Login Admin Successful',
            data
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get('profileAdmin')
    profileAdmin(@User() user: UserAdmin) {
        return {
            message: 'Request Admin valid',
            user
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('refreshAdmin')
    refreshTokenAdmin(@User() user: UserAdmin) {
        const data = this.authService.loginAdmin(user);
        return {
            message: 'Refresh Admin Successful',
            data
        }
    }
}
