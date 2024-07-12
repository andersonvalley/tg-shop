import { PartialType } from '@nestjs/mapped-types';
import { CreateShopCartDto } from './create-shop-cart.dto';

export class UpdateCartDto extends PartialType(CreateShopCartDto) {
  id: string;
  quantity_cart: number;
}
