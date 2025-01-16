import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { TelegramBotModule } from '../telegram-bot/telegram-bot.module';

@Module({
  providers: [FilesService],
  exports: [FilesService],
  imports: [TelegramBotModule],
})
export class FilesModule {}
