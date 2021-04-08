import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from 'src/common/decorators';
import { UserResident } from 'src/user-resident/entities/user-resident.entity';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { LocalAuthGuard, JwtAuthGuard } from './guards';

@ApiTags('Auth')
@ApiResponse({ status: 500, description: 'Internal Error.'})
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @UseGuards(LocalAuthGuard)
    @ApiBody({ description: 'User Data', type: AuthDto})
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
}
