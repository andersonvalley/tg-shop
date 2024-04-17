import { Module } from '@nestjs/common';
import { VariantService } from './variant.service';
import { VariantController } from './variant.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VariantEntity } from './entities/variant.entity';

@Module({
  controllers: [VariantController],
  providers: [VariantService],
  imports: [ConfigModule.forRoot(), TypeOrmModule.forFeature([VariantEntity])],
  exports: [VariantService],
})
export class VariantModule {}
