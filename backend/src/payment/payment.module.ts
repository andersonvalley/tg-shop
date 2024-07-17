import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentEntity } from './entities/payment.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([PaymentEntity, ShopEntity]),
  ],
  exports: [PaymentService],
})
export class PaymentModule {}
