import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ShopsModule } from './shops/shops.module';
import { CategoryModule } from './category/category.module';
import { GoodsModule } from './goods/goods.module';
import { DeliveryModule } from './delivery/delivery.module';
import { PromocodesModule } from './promocodes/promocodes.module';
import { NoficationModule } from './nofication/nofication.module';
import { ShareModule } from './share/share.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SubscriberModule } from './subscriber/subscriber.module';
import { OrderModule } from './order/order.module';
import { OptionModule } from './option/option.module';
import { VariantModule } from './variant/variant.module';
import { PhotoGoodsModule } from './photo-goods/photo-goods.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: +process.env.POSTGRES_PORT,
      database: process.env.DB_NAME,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      entities: [join(__dirname, '**', '/../**/*.entity{.ts,.js}')],
      migrations: [join(__dirname, '**', '/../**/*.migration{.ts,.js}')],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'api', 'uploads'),
      serveRoot: '/api/uploads',
    }),
    ConfigModule.forRoot(),
    AuthModule,
    ShopsModule,
    CategoryModule,
    GoodsModule,
    DeliveryModule,
    PromocodesModule,
    NoficationModule,
    ShareModule,
    SubscriberModule,
    OrderModule,
    PhotoGoodsModule,
    VariantModule,
    OptionModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
