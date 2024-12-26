import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendOtp(email: string, otp: number) {
    try {
      await this.mailerService.sendMail({
        to: email, // list of receivers
        subject: 'Your OTP',
        html: `<b>Your OTP is ${otp}</b>`, // HTML body content
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
