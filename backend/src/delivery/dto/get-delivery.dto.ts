import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryDto } from './create-delivery.dto';
import { UUID } from 'crypto';
import { IsUUID } from 'class-validator';

export class getDeliveryDto extends PartialType(CreateDeliveryDto) {
  @IsUUID()
  id: UUID;
}
