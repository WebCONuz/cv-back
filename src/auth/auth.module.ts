import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../email/email.module';
import { OtpModule } from '../otp/otp.module';
import { TelegramBotModule } from '../telegram-bot/telegram-bot.module';

@Module({
  imports: [
    UsersModule,
    EmailModule,
    OtpModule,
    JwtModule.register({}),
    TelegramBotModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
