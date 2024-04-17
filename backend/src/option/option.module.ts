import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionEntity } from './entities/option.entity';

@Module({
  controllers: [OptionController],
  providers: [OptionService],
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([OptionEntity])],
  exports: [OptionService],
})
export class OptionModule {}
