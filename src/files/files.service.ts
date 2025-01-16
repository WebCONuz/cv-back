import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { TelegramBotService } from '../telegram-bot/telegram-bot.service';

@Injectable()
export class FilesService {
  constructor(private readonly botService: TelegramBotService) {}

  async createImage(file): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static', 'images');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      this.botService.sendFile(`${filePath}/${fileName}`);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'Rasmni yuklashda xatolik!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
