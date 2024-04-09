import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { UserEntity } from 'src/auth/entities/user.entity';
import { ShopEntity } from './entities/shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { DeliveryEntity } from 'src/delivery/entities/delivery.entity';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      ShopEntity,
      UserEntity,
      CategoryEntity,
      DeliveryEntity,
    ]),
  ],
  exports: [ShopsService],
})
export class ShopsModule {}
