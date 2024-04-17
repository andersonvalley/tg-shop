import { Injectable } from '@nestjs/common';
import { CreatePhotoGoodDto } from './dto/create-photo-good.dto';
import { UpdatePhotoGoodDto } from './dto/update-photo-good.dto';

@Injectable()
export class PhotoGoodsService {
  create(createPhotoGoodDto: CreatePhotoGoodDto) {
    return 'This action adds a new photoGood';
  }

  findAll() {
    return `This action returns all photoGoods`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photoGood`;
  }

  update(id: number, updatePhotoGoodDto: UpdatePhotoGoodDto) {
    return `This action updates a #${id} photoGood`;
  }

  remove(id: number) {
    return `This action removes a #${id} photoGood`;
  }
}
