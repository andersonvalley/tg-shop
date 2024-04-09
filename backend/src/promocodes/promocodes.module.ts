import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromocodeEntity } from './entities/promocode.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { PromocodeController } from './promocodes.controller';
import { PromocodeService } from './promocodes.service';

@Module({
  controllers: [PromocodeController],
  providers: [PromocodeService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([PromocodeEntity, ShopEntity]),
  ],
  exports: [PromocodeService],
})
export class PromocodesModule {}
