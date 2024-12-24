import { Module } from '@nestjs/common';
import { SocialmediaService } from './socialmedia.service';
import { SocialmediaController } from './socialmedia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Socialmedia } from './entities/socialmedia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Socialmedia])],
  controllers: [SocialmediaController],
  providers: [SocialmediaService],
})
export class SocialmediaModule {}
