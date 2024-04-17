import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PhotoGoodsService } from './photo-goods.service';
import { CreatePhotoGoodDto } from './dto/create-photo-good.dto';
import { UpdatePhotoGoodDto } from './dto/update-photo-good.dto';

@Controller('photo-goods')
export class PhotoGoodsController {
  constructor(private readonly photoGoodsService: PhotoGoodsService) {}

  @Post()
  create(@Body() createPhotoGoodDto: CreatePhotoGoodDto) {
    return this.photoGoodsService.create(createPhotoGoodDto);
  }

  @Get()
  findAll() {
    return this.photoGoodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photoGoodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePhotoGoodDto: UpdatePhotoGoodDto) {
    return this.photoGoodsService.update(+id, updatePhotoGoodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoGoodsService.remove(+id);
  }
}
