import {
  Controller,
  Post,
  Body,
  Res,
  HttpCode,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsersDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login-auth.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { CreateOtpDto } from '../otp/dto/create-otp.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUsersDto: CreateUsersDto) {
    return this.authService.signup(createUsersDto);
  }

  @Post('signin')
  @HttpCode(200)
  signin(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signin(res, loginDto);
  }

  @Post('refresh')
  @HttpCode(200)
  refresh(
    @Body() refreshDto: { id: number; refresh_token: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refresh(
      res,
      refreshDto.id,
      refreshDto.refresh_token,
    );
  }

  @Get('logout')
  @UseGuards(AuthGuard)
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const payload = req['user'];
    console.log(payload);

    return this.authService.logout(+payload.sub, res);
  }

  @Post('verify')
  verify(
    @Res({ passthrough: true }) res: Response,
    @Body() createOtpDto: CreateOtpDto,
  ) {
    return this.authService.verifyOtp(res, createOtpDto);
  }

  @Post('forget-password')
  forget(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }
}
