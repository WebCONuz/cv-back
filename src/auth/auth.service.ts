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
import { EmailService } from '../email/email.service';
import { OtpService } from '../otp/otp.service';
import { CreateOtpDto } from '../otp/dto/create-otp.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly otpService: OtpService,
    private readonly botService: TelegramBotService,
  ) {}
  async signup(createUsersDto: CreateUsersDto) {
    // hashed password
    const hashPassword = await bcrypt.hash(createUsersDto.password, 7);

    // save data
    const user = await this.userService.create({
      ...createUsersDto,
      password: hashPassword,
    });

    // sent otp to email
    let otp = Math.round(Math.random() * 10000);
    await this.otpService.create({ otp, user_id: user.id });
    await this.emailService.sendOtp(user.email, otp);

    return { message: `OTP kodingiz ${user.email} ga yuborildi!` };
  }

  async forgetPassword(data: ForgetPasswordDto) {
    const user = await this.userService.findByEmail(data.email);
    let newPassword = '$AaBb' + Math.round(Math.random() * 10000);

    const hashPassword = await bcrypt.hash(newPassword, 7);
    await this.userService.update(user.id, { password: hashPassword });

    await this.emailService.sendNewPassword(user.email, newPassword);
    return {
      status: 'Success',
      message: 'Yangi parol emailingizga yuborildi!',
    };
  }

  async verifyOtp(res: Response, data: CreateOtpDto) {
    const otpData = await this.otpService.findOne(data.user_id);
    if (!otpData) {
      throw new BadRequestException("Xato so'rov!");
    }
    if (data.otp !== otpData.otp) {
      throw new BadRequestException('Xato otp!');
    }
    let t = new Date(Date.now());
    if (otpData.expires < t) {
      throw new BadRequestException("Otp vaqti o'tib ketgan!");
    }

    const user = await this.userService.findOne(data.user_id);
    // create tokens
    const tokens = await this.createTokens(user.id, user.email, user.is_active);
    await this.otpService.remove(otpData.id);

    // write token to cookie
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 10 * 60 * 1000,
      httpOnly: true,
    });

    // save token to db
    const hashToken = await bcrypt.hash(tokens.refresh_token, 7);
    await this.userService.saveToken(user.id, {
      refresh_token: hashToken,
      is_active: true,
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

    // send message to telegram bot
    this.botService.sendMessage(`${user.email} user is login successfully!`);

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

  async logout(id: number, res: Response) {
    const user = await this.userService.findOne(id);

    if (user.refresh_token) {
      await this.userService.saveToken(user.id, {
        refresh_token: null,
      });

      res.clearCookie('refresh_token');
    }
    return { logout: true };
  }
}
