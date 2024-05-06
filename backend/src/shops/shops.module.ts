import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { UserEntity } from 'src/auth/entities/user.entity';
import { ShopEntity } from './entities/shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { DeliveryEntity } from 'src/delivery/entities/delivery.entity';
import { PromocodeEntity } from 'src/promocodes/entities/promocode.entity';
import { SubscriberEntity } from 'src/subscriber/entities/subscriber.entity';
import { GoodsEntity } from 'src/goods/entities/good.entity';
import { VariantEntity } from 'src/variant/entities/variant.entity';
import { OptionEntity } from 'src/option/entities/option.entity';
import { FilesEntity } from 'src/files/entities/photo-good.entity';
import { MessageEntity } from 'src/message/entities/message.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { NotificationEntity } from 'src/nofication/entities/nofication.entity';
import { ShareEntity } from 'src/share/entities/share.entity';
import { ShopCartEntity } from 'src/shop-cart/entities/shop-cart.entity';
import { CategoryService } from 'src/category/category.service';
import { GoodsService } from 'src/goods/goods.service';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService, CategoryService, GoodsService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([
      ShopEntity,
      UserEntity,
      CategoryEntity,
      DeliveryEntity,
      PromocodeEntity,
      SubscriberEntity,
      CategoryEntity,
      GoodsEntity,
      FilesEntity,
      OptionEntity,
      VariantEntity,
      MessageEntity,
      SubscriberEntity,
      OrderEntity,
      PromocodeEntity,
      NotificationEntity,
      ShareEntity,
      ShopCartEntity,
    ]),
  ],
  exports: [ShopsService],
})
export class ShopsModule {}
