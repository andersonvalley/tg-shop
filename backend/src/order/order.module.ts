import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([OrderEntity, ShopEntity]),
  ],
  exports: [OrderService],
})
export class OrderModule {}
