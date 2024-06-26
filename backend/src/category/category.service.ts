import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { GoodsEntity } from 'src/goods/entities/good.entity';
import { GoodsService } from 'src/goods/goods.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(GoodsEntity)
    private readonly goodsRepository: Repository<GoodsEntity>,
    private readonly goodsService: GoodsService,
  ) {}
  async create(createCategoryDto: CreateCategoryDto, id: string) {
    const shop = await this.shopRepository.findOne({ where: { id } });

    if (!shop) {
      throw new Error('Магазин не найден');
    }

    const newCategory = this.categoryRepository.create(createCategoryDto);

    newCategory.shop = shop;
    await this.categoryRepository.save(newCategory);

    return { message: 'Успешно' };
  }

  async findAll(id: string) {
    const shop = await this.shopRepository.findOne({
      where: { id },
      relations: { categories: true },
    });

    if (!shop) throw new BadRequestException('Магазин не найден');

    return shop?.categories;
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) throw new BadRequestException('Категория не найдена');

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) throw new BadRequestException('Категория не найдена');

    await this.categoryRepository.update(id, {
      title: updateCategoryDto.title,
    });

    return { messge: 'success' };
  }

  async remove(id: string) {
    const products = await this.goodsRepository.find({
      where: { category: { id } },
    });

    for (const product of products) {
      await this.goodsService.remove(product.id);
    }

    await this.categoryRepository.delete(id);
    return { message: 'success' };
  }
}
