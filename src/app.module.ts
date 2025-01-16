import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { UsersModule } from './users/users.module';
import { LanguageModule } from './language/language.module';
import { SkillModule } from './skill/skill.module';
import { ExperienceModule } from './experience/experience.module';
import { EducationModule } from './education/education.module';
import { SocialmediaModule } from './socialmedia/socialmedia.module';
import { UsermessageModule } from './usermessage/usermessage.module';
import { ReleationsModule } from './releations/releations.module';
import { MediaModule } from './media/media.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { OtpModule } from './otp/otp.module';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';
import { TelegramBotModule } from './telegram-bot/telegram-bot.module';
import { TelegrafModule } from 'nestjs-telegraf';

@Module({
  imports: [
    // env
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // typeorm
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),

    // email service
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST,
        port: +process.env.SMTP_PORT,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SMTP_USER,
      },
    }),

    // Static Folder
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),

    // Telegram Bot
    TelegrafModule.forRootAsync({
      botName: 'web_xabarchi_bot',
      useFactory: () => ({
        token: process.env.TELEGRAM_BOT_TOKEN,
        middlewares: [],
        include: [TelegramBotModule],
      }),
    }),
    TelegramBotModule,

    // modules
    RoleModule,
    UsersModule,
    LanguageModule,
    SkillModule,
    ExperienceModule,
    EducationModule,
    SocialmediaModule,
    UsermessageModule,
    ReleationsModule,
    MediaModule,
    AuthModule,
    EmailModule,
    OtpModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
