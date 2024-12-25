import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUsersDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-auth.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(res: Response, createUsersDto: CreateUsersDto) {
    // hashed password
    const hashPassword = await bcrypt.hash(createUsersDto.password, 7);

    // save data
    const user = await this.userService.create({
      ...createUsersDto,
      password: hashPassword,
    });

    // create tokens
    const tokens = await this.createTokens(user.id, user.email, user.is_active);

    // write token to cookie
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
    });

    // save token to db
    const hashToken = await bcrypt.hash(tokens.refresh_token, 7);
    await this.userService.saveToken(user.id, {
      refresh_token: hashToken,
    });

    return tokens;
  }

  async signin(res: Response, loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new BadRequestException('Wrong email or password!');
    }

    const compared = await bcrypt.compare(loginDto.password, user.password);
    if (!compared) {
      throw new BadRequestException('Wrong email or password!');
    }

    // create tokens
    const tokens = await this.createTokens(user.id, user.email, user.is_active);

    // write token to cookie
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
    });

    // save token to db
    const hashToken = await bcrypt.hash(tokens.refresh_token, 7);
    await this.userService.saveToken(user.id, {
      refresh_token: hashToken,
    });

    return tokens;
  }

  async refresh(res: Response, userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User is not found!');
    }

    const compared = await bcrypt.compare(refreshToken, user.refresh_token);
    if (!compared) {
      throw new UnauthorizedException('Unavailable token!');
    }

    // create tokens
    const tokens = await this.createTokens(user.id, user.email, user.is_active);

    // write token to cookie
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
    });

    // save token to db
    const hashToken = await bcrypt.hash(tokens.refresh_token, 7);
    await this.userService.saveToken(user.id, {
      refresh_token: hashToken,
    });

    return tokens;
  }

  async createTokens(id: number, email: string, is_active: boolean) {
    const payload = { sub: id, email, is_active };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_KEY,
      expiresIn: process.env.JWT_ACCESS_TIME,
    });

    const refresh_token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_KEY,
      expiresIn: process.env.JWT_REFRESH_TIME,
    });

    return { access_token, refresh_token };
  }
}
