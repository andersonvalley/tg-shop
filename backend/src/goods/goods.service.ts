import { Injectable } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  create(createGoodDto: CreateGoodDto) {
    return 'This action adds a new good';
  }

  async findAll(id: string) {
    const shop = await this.shopRepository.findOne({
      where: { id },
      relations: { categories: true },
    });

    return shop.categories.goods;
  }

  findOne(id: number) {
    return `This action returns a #${id} good`;
  }

  update(id: number, updateGoodDto: UpdateGoodDto) {
    return `This action updates a #${id} good`;
  }

  remove(id: number) {
    return `This action removes a #${id} good`;
  }
}
