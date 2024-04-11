import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { GetTokenDto } from './dto/get-token.dto';
import { UserEntity } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from './entities/shop.entity';
import { Telegraf } from 'telegraf';
import { UpdateShopDto } from './dto/update-shop.dto';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { PromocodeEntity } from 'src/promocodes/entities/promocode.entity';
import { DeliveryEntity } from 'src/delivery/entities/delivery.entity';
import { delivery, delivery2 } from 'src/delivery/delivery.data.defult';

@Injectable()
export class ShopsService implements OnModuleInit {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(DeliveryEntity)
    private readonly deliveryRepository: Repository<DeliveryEntity>,
    @InjectRepository(PromocodeEntity)
    private readonly promocodeRepository: Repository<PromocodeEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  onModuleInit() {
    // this.launchAllBots();
  }

  async getAll(id: string) {
    const user = await this.userRepository.find({
      where: { id },
      relations: { shops: true },
    });

    if (!user) {
      return null;
    }

    const shops = user.flatMap((item) => item.shops);
    return shops;
  }

  async getById(shopId: string) {
    const shop = await this.shopRepository.findOne({
      where: { id: shopId },
    });

    return shop;
  }

  async delete(shopId: string) {
    await this.categoryRepository.delete({ shop: { id: shopId } });
    await this.deliveryRepository.delete({ shop: { id: shopId } });
    await this.promocodeRepository.delete({ shop: { id: shopId } });

    // остановить бота

    await this.shopRepository.delete(shopId);
    return { message: 'success' };
  }

  async update(id: string, dto: UpdateShopDto) {
    const shop = await this.shopRepository.findOne({ where: { id } });

    await this.shopRepository.update(id, {
      firstName: dto.firstName ? dto.firstName : shop.firstName,
      username: dto.username ? dto.username : shop.username,
      isActive: dto.isActive ? dto.isActive : shop.isActive,
      titleButton: dto.titleButton ? dto.titleButton : shop.titleButton,
      description: dto.description ? dto.description : shop.description,
      greetings: dto.greetings ? dto.greetings : shop.greetings,
      firstLaunch: dto.firstLaunch ? dto.firstLaunch : shop.firstLaunch,
      afterOrder: dto.afterOrder ? dto.afterOrder : shop.afterOrder,
    });

    return { message: 'success' };
  }

  async getShopToken(dto: GetTokenDto, userId: string) {
    const botData = await this.getBotInfo(dto.token);

    if (!botData.ok) throw new BadRequestException('Некорректный токен');

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { shops: true },
    });

    const findShop = await this.shopRepository.findOne({
      where: { token: dto.token },
    });

    if (findShop) throw new BadRequestException('Так магазин уже создан');

    const data = {
      botId: botData.result.id,
      firstName: botData.result.first_name,
      username: botData.result.username,
      token: dto.token,
    };

    const shop = this.shopRepository.create(data);
    shop.user = user;
    await this.shopRepository.save(shop);

    const newDelivery = this.deliveryRepository.create(delivery);
    const newDelivery2 = this.deliveryRepository.create(delivery2);

    newDelivery.shop = shop;
    newDelivery2.shop = shop;
    await this.deliveryRepository.save(newDelivery);
    await this.deliveryRepository.save(newDelivery2);

    // TODO
    // отправить уведомление в бот, что создан магазин

    this.createBotServer(dto.token);
  }

  async getBotInfo(token: string) {
    const url = `https://api.telegram.org/bot${token}/getMe`;
    const response = await fetch(url);

    if (!response) return;
    const data = await response.json();

    return data;
  }

  async createBotServer(token: string) {
    const bot = new Telegraf(token);

    bot.start((ctx) => {
      ctx.setChatMenuButton({
        type: 'web_app',
        text: '🕹️ Меню',
        web_app: { url: process.env.WEB_APP },
      });
    });

    bot.launch();
  }

  async launchAllBots() {
    const shops = await this.shopRepository.find();

    shops.forEach(({ token, isActive }) => {
      if (!isActive) return;

      const bot = new Telegraf(token);

      bot.hears('/start', async (ctx) => {
        const tUser = ctx.from;

        // сохранить как подписчика
        console.log(tUser);
      });

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
