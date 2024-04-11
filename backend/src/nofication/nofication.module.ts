import { Module } from '@nestjs/common';
import { NoficationService } from './nofication.service';
import { NoficationController } from './nofication.controller';

@Module({
  controllers: [NoficationController],
  providers: [NoficationService],
})
export class NoficationModule {}
