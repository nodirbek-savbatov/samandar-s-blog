import { Injectable } from '@nestjs/common';
import { Update, Start, On, Command, Ctx } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Injectable()
@Update()
export class TelegramBotUpdate {
  @Start()
  async onStart(@Ctx() ctx: Context) {
    console.log("hi");
    await ctx.reply('Welcome! I am your bot 🤖');
  }

  @Command('help')
  async onHelp(@Ctx() ctx: Context) {
    await ctx.reply('Here are the available commands:\n/start - Start the bot\n/help - Help');
  }

  @On('text')
  async onMessage(@Ctx() ctx: Context) {
    const message = ctx.message;

    if (message && 'text' in message) {
      const hasUrl = message.entities && message.entities.some(entity => entity.type === 'url');

      if (hasUrl) {
        // Check if the user is an admin
        const chatMember = await ctx.getChatMember(message.from.id);
        const isAdmin = chatMember.status === 'administrator' || chatMember.status === 'creator';

        if (!isAdmin) {
          await ctx.deleteMessage();

          await ctx.restrictChatMember(message.from.id, {
            permissions: {
              can_send_messages: false, // Only disable sending messages
            },
            until_date: Math.floor(Date.now() / 1000) + 30, // 30 seconds from now
          });

          // Send a warning message to the user
          await ctx.reply(`You posted a link, which is not allowed. You are temporarily muted for 30 seconds.`);
        }
      } else {
        await ctx.reply(`You said: ${message.text}`);
      }
    } else {
      await ctx.reply("Hi, how can I help you?");
    }
  }
}
