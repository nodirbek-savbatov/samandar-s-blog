import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';
import { TelegramBotService } from './bot.service';
import { TelegramBotUpdate } from './bot.update';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.BOT_TOKEN, 
    }),
  ],
  providers: [TelegramBotService, TelegramBotUpdate],
})
export class TelegramBotModule {}
