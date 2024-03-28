import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { UserEntity } from 'src/auth/entities/user.entity';
import { ShopEntity } from './entities/shop.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ShopEntity, UserEntity]),
  ],
})
export class ShopsModule {}
