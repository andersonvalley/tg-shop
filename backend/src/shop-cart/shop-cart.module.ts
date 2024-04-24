import { Module } from '@nestjs/common';
import { ShopCartService } from './shop-cart.service';
import { ShopCartController } from './shop-cart.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopCartEntity } from './entities/shop-cart.entity';
import { GoodsEntity } from 'src/goods/entities/good.entity';
import { SubscriberEntity } from 'src/subscriber/entities/subscriber.entity';

@Module({
  controllers: [ShopCartController],
  providers: [ShopCartService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ShopCartEntity, GoodsEntity, SubscriberEntity]),
  ],
  exports: [ShopCartService],
})
export class ShopCartModule {}
