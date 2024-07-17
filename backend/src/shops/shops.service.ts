import { BadRequestException, Injectable } from '@nestjs/common';
import { GetTokenDto } from './dto/get-token.dto';
import { UserEntity } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from './entities/shop.entity';
import { UpdateShopDto } from './dto/update-shop.dto';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { PromocodeEntity } from 'src/promocodes/entities/promocode.entity';
import { DeliveryEntity } from 'src/delivery/entities/delivery.entity';
import { delivery, delivery2 } from 'src/delivery/delivery.data.defult';
import { createBot, sendNotification, stopBot } from './Bot';
import { SubscriberEntity } from 'src/subscriber/entities/subscriber.entity';
import { CategoryService } from 'src/category/category.service';
import { OrderEntity } from 'src/order/entities/order.entity';
import { ShareEntity } from 'src/share/entities/share.entity';
import { ShopCartEntity } from 'src/shop-cart/entities/shop-cart.entity';
import { MessageEntity } from 'src/message/entities/message.entity';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { paymentDefault } from 'src/payment/payment.default';

@Injectable()
export class ShopsService {
  constructor(
    private categoryService: CategoryService,
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(DeliveryEntity)
    private readonly deliveryRepository: Repository<DeliveryEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(PromocodeEntity)
    private readonly promocodeRepository: Repository<PromocodeEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(SubscriberEntity)
    private readonly subscriberRepository: Repository<SubscriberEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(ShareEntity)
    private readonly shareRepository: Repository<ShareEntity>,
    @InjectRepository(ShopCartEntity)
    private readonly shopCartRepository: Repository<ShopCartEntity>,
  ) {}

  async getAll(id: string) {
    const user = await this.userRepository.find({
      where: { id },
      relations: { shops_: true },
    });

    if (!user) {
      return null;
    }

    const shops = user.flatMap((item) => item.shops_);
    return shops;
  }

  async getById(shopId: string) {
    const shop = await this.shopRepository.findOne({
      where: { id: shopId },
    });

    return shop;
  }

  async delete(id: string) {
    const shop = await this.shopRepository.findOne({ where: { id: id } });
    const categories = await this.categoryRepository.find({
      where: { shop: { id } },
    });

    await stopBot(shop.token);

    const relatedTables = [
      this.promocodeRepository,
      this.deliveryRepository,
      this.paymentRepository,
      this.orderRepository,
    ];

    const relatedTablesGo = [this.shareRepository, this.subscriberRepository];

    await this.messageRepository.delete({ bot_: { id } });

    for (const category of categories) {
      await this.categoryService.remove(category.id);
    }

    await Promise.all(
      relatedTablesGo.map(async (table) => {
        await table.delete({ shop_: { id } });
      }),
    );

    await Promise.all(
      relatedTables.map(async (table) => {
        await table.delete({ shop: { id } });
      }),
    );

    await this.shopRepository.delete(id);
    return { messge: 'success' };
  }

  async update(id: string, dto: UpdateShopDto) {
    const shop = await this.shopRepository.findOne({ where: { id } });

    await this.shopRepository.update(id, {
      first_name: dto.firstName ? dto.firstName : shop.first_name,
      username: dto.username ? dto.username : shop.username,
      is_active: dto.isActive ? dto.isActive : shop.is_active,
      title_button: dto.titleButton ? dto.titleButton : shop.title_button,
      description: dto.description ? dto.description : shop.description,
      greetings: dto.greetings ? dto.greetings : shop.greetings,
      first_launch: dto.firstLaunch ? dto.firstLaunch : shop.first_launch,
      after_order: dto.afterOrder ? dto.afterOrder : shop.after_order,
    });

    return { message: 'success' };
  }

  async getShopToken(dto: GetTokenDto, userId: string) {
    const botData = await this.getBotInfo(dto.token);

    if (!botData.ok) throw new BadRequestException('Некорректный токен');

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { shops_: true },
    });

    const findShop = await this.shopRepository.findOne({
      where: { token: dto.token },
    });

    if (findShop) throw new BadRequestException('Такой магазин уже создан');

    const data = {
      bot_id: botData.result.id,
      first_name: botData.result.first_name,
      username: botData.result.username,
      token: dto.token,
    };

    const shop = this.shopRepository.create(data);
    shop.user_ = user;
    await this.shopRepository.save(shop);

    const newDelivery = this.deliveryRepository.create(delivery);
    const newDelivery2 = this.deliveryRepository.create(delivery2);
    const newPayment = this.paymentRepository.create(paymentDefault);

    newDelivery.shop = shop;
    newDelivery2.shop = shop;
    newPayment.shop = shop;
    await this.deliveryRepository.save(newDelivery);
    await this.deliveryRepository.save(newDelivery2);
    await this.paymentRepository.save(newPayment);

    const status = await createBot(dto.token);

    if (status !== 200) {
      await this.delete(shop.id);
      throw new BadRequestException('Ошибка');
    }

    await sendNotification({
      text: 'Магазин создан: ',
      photo: '',
      button: false,
      link: `https://t.me/@${shop.username}`,
      linkText: `@${shop.username}`,
      userId: user.telegram_id,
      shopId: shop.id,
    });

    return { message: 'success' };
  }

  async getBotInfo(token: string) {
    const url = `https://api.telegram.org/bot${token}/getMe`;
    const response = await fetch(url);

    if (!response) return;
    const data = await response.json();

    return data;
  }
}
