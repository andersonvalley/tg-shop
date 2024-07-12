import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateShopCartDto } from './dto/create-shop-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopCartEntity } from './entities/shop-cart.entity';
import { In, Repository } from 'typeorm';
import { GoodsEntity } from 'src/goods/entities/good.entity';
import { SubscriberEntity } from 'src/subscriber/entities/subscriber.entity';
import { UpdateCartDto } from './dto/update-shop-cart.dto';

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
      where: { goods_id: dto.goods, variant_id: dto.variant },
    });

    if (existsGoods) throw new Error('Товар уже добавлен');

    const shopCart = this.cartRepository.create({
      goods_id: dto.goods,
      variant_id: dto.variant,
      options_id: dto.options,
      quantity_cart: dto.quantity_cart,
    });

    shopCart.subscriber_ = subscriber;
    this.cartRepository.save(shopCart);

    return { message: 'success' };
  }

  async find(id: string) {
    const subscriber = await this.subscriberRepository.findOne({
      where: { telegram_id: id },
    });

    if (!subscriber) {
      throw new BadRequestException('Подписчик не найден');
    }

    const products = await this.cartRepository.find({
      where: { subscriber_: { id: subscriber.id } },
      order: {
        created_date: 'ASC',
      },
    });

    const productsIds = products.map((item) => item.goods_id);

    const filtered = await this.goodsRepository.find({
      where: {
        id: In(productsIds),
      },
      order: {
        createdDate: 'ASC',
      },
      relations: ['options', 'variants', 'photoLinks'],
    });

    const filteredMap = new Map(filtered.map((item) => [item.id, item]));
    const mergedProducts = products.map((product) => {
      const detailedProduct = filteredMap.get(product.goods_id);
      return {
        ...detailedProduct,
        ...product,
      };
    });

    return mergedProducts;
  }

  async update(dto: UpdateCartDto) {
    const cartItem = await this.cartRepository.findOne({
      where: { id: dto.id },
    });

    if (!cartItem) throw new BadRequestException('Ошибка');

    if (dto.quantity_cart === 0) {
      await this.cartRepository.delete(dto.id);
    } else {
      await this.cartRepository.update(dto.id, {
        quantity_cart: dto.quantity_cart,
      });
    }

    return { messge: 'success' };
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
