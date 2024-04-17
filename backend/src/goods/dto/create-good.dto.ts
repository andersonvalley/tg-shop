import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGoodDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  categoryId: string;
  linksOfPhoto?: string[];
  description?: string;
  price: string;
  weight?: string;
  quantity?: string;
  vendorCode?: string;
  shopId: string;
}
