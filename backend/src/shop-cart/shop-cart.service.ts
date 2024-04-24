import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateShopCartDto } from './dto/create-shop-cart.dto';
import { UpdateShopCartDto } from './dto/update-shop-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopCartEntity } from './entities/shop-cart.entity';
import { In, Repository } from 'typeorm';
import { GoodsEntity } from 'src/goods/entities/good.entity';
import { SubscriberEntity } from 'src/subscriber/entities/subscriber.entity';

@Injectable()
export class ShopCartService {
  constructor(
    @InjectRepository(ShopCartEntity)
    private readonly cartRepository: Repository<ShopCartEntity>,
    @InjectRepository(GoodsEntity)
    private readonly goodsRepository: Repository<GoodsEntity>,
    @InjectRepository(SubscriberEntity)
    private readonly subscriberRepository: Repository<SubscriberEntity>,
  ) {}

  async create(dto: CreateShopCartDto) {
    const subscriber = await this.subscriberRepository.findOne({
      where: { telegram_id: dto.subscriber },
    });

    if (!subscriber) {
      throw new Error('Subscriber not found');
    }

    const existsGoods = await this.cartRepository.findOne({
      where: { goods_id: dto.goods },
    });

    if (existsGoods) return { message: 'Уже добавлен' };

    const shopCart = this.cartRepository.create({ goods_id: dto.goods });

    shopCart.subscriber_ = subscriber;
    this.cartRepository.save(shopCart);

    return { message: 'success' };
  }

  async find(id: string) {
    const subscriber = await this.subscriberRepository.findOne({
      where: { telegram_id: id },
    });

    if (!subscriber) throw new BadRequestException('Ошибка');

    const products = await this.cartRepository.find({
      where: { subscriber_: { id: subscriber.id } },
    });

    const productsIds = products.map((item) => item.goods_id);

    const filtered = await this.goodsRepository.find({
      where: {
        id: In(productsIds),
      },
      relations: { options: true, variants: true, photoLinks: true },
    });

    return filtered;
  }

  async update(id: number, updateShopCartDto: UpdateShopCartDto) {
    return `This action updates a #${id} shopCart`;
  }

  async removeAll(id: string) {
    const subscriber = await this.subscriberRepository.findOne({
      where: { telegram_id: id },
    });

    const cart = await this.cartRepository.find({
      where: { subscriber_: { id: subscriber.id } },
    });

    for (const item of cart) {
      await this.cartRepository.delete(item.id);
    }

    return { message: 'success' };
  }
}
