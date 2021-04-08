import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'src/common/decorators';
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
    profile() {
        return 'Estos son tu datos';
    }

    @UseGuards(JwtAuthGuard)
    @Get('refresh')
    refreshToken(@User() user: UserResident) {
        const data = this.authService.login(user);
        return {
            message: 'Refresh exitoso',
            data
        }
    }
}
