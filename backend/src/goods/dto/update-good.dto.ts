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
  titleVariant?: string;
  requiredOption?: boolean;

  variants: [
    {
      title: string;
      price: string;
      article: string;
      weight: string;
      quantity: string;
      vendorCode: string;
    },
  ];
  options?: [{ title: string; price: string }];
}
