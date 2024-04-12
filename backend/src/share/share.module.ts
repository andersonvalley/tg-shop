import { Module } from '@nestjs/common';
import { ShareService } from './share.service';
import { ShareController } from './share.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareEntity } from './entities/share.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';

@Module({
  controllers: [ShareController],
  providers: [ShareService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ShareEntity, ShopEntity]),
  ],
  exports: [ShareService],
})
export class ShareModule {}
