import { Injectable, OnModuleInit } from '@nestjs/common';
import { GetTokenDto } from './dto/get-token.dto';
import { UserEntity } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from './entities/shop.entity';
import { Telegraf } from 'telegraf';

@Injectable()
export class ShopsService implements OnModuleInit {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  onModuleInit() {
    this.launchAllBots();
  }

  async getShopToken(dto: GetTokenDto, userId: string) {
    const botData = await this.getBotInfo(dto.token);

    if (!botData.ok) return { error: 'Некорректный токен' };

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { shops: true },
    });

    const info = {
      botId: botData.result.id,
      firstName: botData.result.first_name,
      username: botData.result.username,
      token: dto.token,
    };

    const findShop = await this.shopRepository.findOne({
      where: { token: dto.token },
    });

    if (findShop) return { error: 'Некорректный токен' };

    const shop = this.shopRepository.create(info);
    shop.user = user;
    await this.shopRepository.save(shop);

    // TODO
    // отправить уведомление в бот, что создан магазин

    this.createBotServer(dto.token);
  }

  async getBotInfo(token: string) {
    const url = `https://api.telegram.org/bot${token}/getMe`;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  }

  async createBotServer(token: string) {
    const bot = new Telegraf(token);

    bot.start((ctx) => {
      ctx.reply('👋');
    });

    bot.launch();
  }

  async launchAllBots() {
    const shops = await this.shopRepository.find();

    shops.forEach(({ token, isActive }) => {
      if (!isActive) return;

      const bot = new Telegraf(token);

      bot.start((ctx) => {
        ctx.setChatMenuButton({
          type: 'web_app',
          text: '🕹️ Меню',
          web_app: { url: process.env.WEB_APP },
        });
      });

      bot.launch();
    });
  }
}
