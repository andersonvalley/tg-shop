import { Module } from '@nestjs/common';
import { NoficationService } from './nofication.service';
import { NoficationController } from './nofication.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { NoficationEntity } from './entities/nofication.entity';

@Module({
  controllers: [NoficationController],
  providers: [NoficationService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ShopEntity, NoficationEntity]),
  ],
  exports: [NoficationService],
})
export class NoficationModule {}
