import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriberEntity } from 'src/subscriber/entities/subscriber.entity';
import { MessageEntity } from './entities/message.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([MessageEntity, SubscriberEntity, ShopEntity]),
  ],
  exports: [MessageService],
})
export class MessageModule {}
