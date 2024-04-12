import { IsNotEmpty } from 'class-validator';
import { Binary } from 'typeorm';

export class UploadShareDto {
  @IsNotEmpty()
  sharePhoto: Binary;

  @IsNotEmpty()
  shopId: string;
}
