import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeliveryService } from './delivery.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { AuthGuard } from 'src/auth/auth.gard';
import { UUID } from 'crypto';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  @UseGuards(AuthGuard)
  @Post(':id')
  create(
    @Body() createDeliveryDto: CreateDeliveryDto,
    @Param('id') id: string,
  ) {
    return this.deliveryService.create(createDeliveryDto, id);
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  findAll(@Param('id') id: UUID) {
    return this.deliveryService.findAll(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveryService.update(id, updateDeliveryDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryService.remove(id);
  }
}
