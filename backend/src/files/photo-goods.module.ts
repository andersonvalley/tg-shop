import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesController } from './photo-goods.controller';
import { FilesService } from './photo-goods.service';
import { FilesEntity } from './entities/photo-good.entity';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([FilesEntity])],
  exports: [FilesService],
})
export class PhotoGoodsModule {}
