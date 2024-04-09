import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryDto } from './create-delivery.dto';

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {
  title?: string;
  description?: string;
  price?: string;
  priceFrom?: string;
  isActive?: boolean;
  order?: number;
  name?: boolean;
  address?: boolean;
  phone?: boolean;
  comment?: boolean;
}
