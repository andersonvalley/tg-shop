import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShopCartService } from './shop-cart.service';
import { CreateShopCartDto } from './dto/create-shop-cart.dto';

@Controller('cart')
export class ShopCartController {
  constructor(private readonly shopCartService: ShopCartService) {}

  @Post()
  create(@Body() createShopCartDto: CreateShopCartDto) {
    return this.shopCartService.create(createShopCartDto);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.shopCartService.find(id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return this.shopCartService.update(+id);
  }

  @Delete(':id')
  removeAll(@Param('id') id: string) {
    return this.shopCartService.removeAll(id);
  }
}
