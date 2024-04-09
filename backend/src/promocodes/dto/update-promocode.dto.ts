import { PartialType } from '@nestjs/mapped-types';
import { CreatePromocodeDto } from './create-promocode.dto';

export class UpdatePromocodeDto extends PartialType(CreatePromocodeDto) {
  title?: string;
  description?: string;
  apply?: string;
  discount?: string;
  discountBy?: string;
  orderFrom?: string;
  isActive?: boolean;
  order?: number;
}
