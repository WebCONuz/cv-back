import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';

@Injectable()
export class TelegramBotService {
  constructor(
    @InjectBot('web_xabarchi_bot') private readonly bot: Telegraf<Context>,
  ) {}

  async sendMessage(message: string) {
    try {
      await this.bot.telegram.sendChatAction(
        process.env.TELEGRAM_USER,
        'typing',
      );
      await this.bot.telegram.sendMessage(process.env.TELEGRAM_USER, message);

      return true;
    } catch (error) {
      console.log(`Telegram bot bilan bog'lik xatolik \n ${error}`);
    }
  }

  async sendFile(filePath: string) {
    try {
      await this.bot.telegram.sendDocument(process.env.TELEGRAM_USER, {
        source: filePath,
      });
    } catch (error) {
      console.log(`Telegram bot bilan bog'lik xatolik \n ${error}`);
    }
  }
}
