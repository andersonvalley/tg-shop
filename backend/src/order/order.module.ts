import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { SubscriberEntity } from 'src/subscriber/entities/subscriber.entity';
import { DeliveryEntity } from 'src/delivery/entities/delivery.entity';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { PromocodeEntity } from 'src/promocodes/entities/promocode.entity';
import { ShopCartEntity } from 'src/shop-cart/entities/shop-cart.entity';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      OrderEntity,
      ShopEntity,
      SubscriberEntity,
      DeliveryEntity,
      PaymentEntity,
      PromocodeEntity,
      ShopCartEntity,
    ]),
  ],
  exports: [OrderService],
})
export class OrderModule {}
