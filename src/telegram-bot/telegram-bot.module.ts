import { Module } from '@nestjs/common';
import { TelegramBotService } from './telegram-bot.service';
import { BotUpdate } from './update-bot';

@Module({
  providers: [TelegramBotService, BotUpdate],
  exports: [TelegramBotService],
})
export class TelegramBotModule {}
