import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { CategoryEntity } from './entities/category.entity';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ShopEntity, CategoryEntity]),
  ],
  exports: [CategoryService],
})
export class CategoryModule {}
