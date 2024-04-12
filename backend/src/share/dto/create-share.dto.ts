import { IsNotEmpty } from 'class-validator';

export class CreateShareDto {
  @IsNotEmpty()
  text: string;

  photoLink: string;
  addButton: boolean;

  @IsNotEmpty()
  shopId: string;
}
