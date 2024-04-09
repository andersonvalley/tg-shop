import { Module } from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { DeliveryEntity } from './entities/delivery.entity';

@Module({
  controllers: [DeliveryController],
  providers: [DeliveryService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([DeliveryEntity, ShopEntity]),
  ],
  exports: [DeliveryService],
})
export class DeliveryModule {}
