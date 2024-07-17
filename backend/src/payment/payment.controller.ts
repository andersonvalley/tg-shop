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
import { AuthGuard } from 'src/auth/auth.gard';
import { UUID } from 'crypto';
import { PaymentService } from './payment.service';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Post(':id')
  create(@Body() createDeliveryDto: CreatePaymentDto, @Param('id') id: string) {
    return this.paymentService.create(createDeliveryDto, id);
  }

  @UsePipes(new ValidationPipe())
  @Get(':id')
  findAll(@Param('id') id: UUID) {
    return this.paymentService.findAll(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDeliveryDto: UpdatePaymentDto) {
    return this.paymentService.update(id, updateDeliveryDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(id);
  }
}
