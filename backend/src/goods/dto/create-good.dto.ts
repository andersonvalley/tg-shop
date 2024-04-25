import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGoodDto {
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

  options?: [{ title: string; price: string }];
  // titleOption?: string;
  // requiredOption?: string;
}
