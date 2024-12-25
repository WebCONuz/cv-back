import { Module } from '@nestjs/common';
import { UsermessageService } from './usermessage.service';
import { UsermessageController } from './usermessage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usermessage } from './entities/usermessage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usermessage])],
  controllers: [UsermessageController],
  providers: [UsermessageService],
})
export class UsermessageModule {}
