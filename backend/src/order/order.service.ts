import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { Repository } from 'typeorm';
import { OrderEntity } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { SubscriberEntity } from 'src/subscriber/entities/subscriber.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { DeliveryEntity } from 'src/delivery/entities/delivery.entity';
import { PromocodeEntity } from 'src/promocodes/entities/promocode.entity';
import { ShopCartEntity } from 'src/shop-cart/entities/shop-cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(SubscriberEntity)
    private readonly subscriberRepository: Repository<SubscriberEntity>,
    @InjectRepository(DeliveryEntity)
    private readonly deliveryRepository: Repository<DeliveryEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    @InjectRepository(PromocodeEntity)
    private readonly promocodeRepository: Repository<PromocodeEntity>,
    @InjectRepository(ShopCartEntity)
    private readonly shopCartRepository: Repository<ShopCartEntity>,
  ) {}

  async create(dto: CreateOrderDto, id: string) {
    const shop = await this.shopRepository.findOne({
      where: { id },
    });

    if (!shop) throw new BadRequestException('Магазин не найден');

    const client = await this.subscriberRepository.findOne({
      where: { telegram_id: dto.subscriberId },
    });

    const delivery = await this.deliveryRepository.findOne({
      where: { id: dto.deliveryId },
    });

    const payment = await this.paymentRepository.findOne({
      where: { id: dto.paymentId },
    });

    let promocode = null;

    if (dto.promocodeId !== '') {
      promocode = await this.promocodeRepository.findOne({
        where: { id: dto.promocodeId },
      });
    }

    const newOrder = this.orderRepository.create(dto);
    newOrder.shop = shop;
    newOrder.subscriber = client;
    newOrder.delivery = delivery;
    newOrder.payment = payment;
    newOrder.promocode = promocode;

    await this.orderRepository.save(newOrder);

    await this.shopCartRepository.delete({ subscriber_: { id: client.id } });

    return { message: 'Успешно' };
  }

  async findAll(id: string) {
    const orders = await this.orderRepository.find({
      where: { shop: { id } },
      order: {
        createdDate: 'ASC',
      },
    });

    if (!orders) throw new BadRequestException('Неизвестная ошибка');

    return orders;
  }

  async update(dto: UpdateOrderDto, id: string) {
    const delivery = await this.orderRepository.findOne({ where: { id } });

    if (!delivery) throw new BadRequestException('Способ доставки не найдена');

    await this.orderRepository.update(id, dto);

    return { messge: 'success' };
  }
}
