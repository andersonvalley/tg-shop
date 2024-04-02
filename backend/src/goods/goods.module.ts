import { Module } from '@nestjs/common';
import { GoodsService } from './goods.service';
import { GoodsController } from './goods.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsEntity } from './entities/good.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';

@Module({
  controllers: [GoodsController],
  providers: [GoodsService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ShopEntity, GoodsEntity, CategoryEntity]),
  ],
  exports: [GoodsService],
})
export class GoodsModule {}
