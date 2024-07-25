import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { AuthGuard } from 'src/auth/auth.gard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post(':id')
  create(@Body() dto: CreateOrderDto, @Param('id') id: string) {
    return this.orderService.create(dto, id);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.orderService.findAll(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.orderService.update(dto, id);
  }
}
