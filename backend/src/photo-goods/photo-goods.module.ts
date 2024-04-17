import { Module } from '@nestjs/common';
import { PhotoGoodsService } from './photo-goods.service';
import { PhotoGoodsController } from './photo-goods.controller';
import { PhotoGoodsEntity } from './entities/photo-good.entity';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PhotoGoodsController],
  providers: [PhotoGoodsService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([PhotoGoodsEntity]),
  ],
  exports: [PhotoGoodsService],
})
export class PhotoGoodsModule {}
