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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
