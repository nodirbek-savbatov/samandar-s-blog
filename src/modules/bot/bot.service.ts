import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramBotService {
  getHelpText(): string {
    return 'Here are the available commands:\n/start - Start the bot\n/help - Help';
  }
}
