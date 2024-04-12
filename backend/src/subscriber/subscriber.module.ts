import { Module } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { SubscriberController } from './subscriber.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriberEntity } from './entities/subscriber.entity';

@Module({
  controllers: [SubscriberController],
  providers: [SubscriberService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([SubscriberEntity]),
  ],
  exports: [SubscriberService],
})
export class SubscriberModule {}
