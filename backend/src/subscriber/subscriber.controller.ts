import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { SubscriberService } from './subscriber.service';
import { AuthGuard } from 'src/auth/auth.gard';

@Controller('subscriber')
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @UseGuards(AuthGuard)
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.subscriberService.findAll(id);
  }

  @Get('/get/:id')
  findById(@Param('id') id: string) {
    return this.subscriberService.findById(id);
  }
}
