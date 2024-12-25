import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsersDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login-auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(
    @Body() createUsersDto: CreateUsersDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.signup(res, createUsersDto);
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
}
