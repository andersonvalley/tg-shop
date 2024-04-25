import { PartialType } from '@nestjs/mapped-types';
import { CreateGoodDto } from './create-good.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateGoodDto extends PartialType(CreateGoodDto) {
  @IsNotEmpty()
  @IsString()
  title: string;

  categoryId: string;
  photoLinks?: string[];
  description?: string;
  price: number;
  discount?: number;
  weight?: string;
  quantity?: string;
  vendorCode?: string;
  shopId: string;

  titleOption?: string;
  requiredOption?: boolean;

  options?: [{ title: string; price: string }];
}
