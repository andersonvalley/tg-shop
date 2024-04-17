import { PartialType } from '@nestjs/mapped-types';
import { CreatePhotoGoodDto } from './create-photo-good.dto';

export class UpdatePhotoGoodDto extends PartialType(CreatePhotoGoodDto) {}
