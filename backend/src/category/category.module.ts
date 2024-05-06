import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { CategoryEntity } from './entities/category.entity';
import { GoodsService } from 'src/goods/goods.service';
import { FilesEntity } from 'src/files/entities/photo-good.entity';
import { OptionEntity } from 'src/option/entities/option.entity';
import { VariantEntity } from 'src/variant/entities/variant.entity';
import { GoodsEntity } from 'src/goods/entities/good.entity';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, GoodsService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      ShopEntity,
      CategoryEntity,
      FilesEntity,
      OptionEntity,
      VariantEntity,
      GoodsEntity,
    ]),
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
