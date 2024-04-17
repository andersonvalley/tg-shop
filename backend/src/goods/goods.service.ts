import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsEntity } from './entities/good.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { PhotoGoodsEntity } from 'src/photo-goods/entities/photo-good.entity';
import { VariantEntity } from 'src/variant/entities/variant.entity';
import { OptionEntity } from 'src/option/entities/option.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsEntity)
    private readonly goodsRepository: Repository<GoodsEntity>,
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(PhotoGoodsEntity)
    private readonly filesRepository: Repository<PhotoGoodsEntity>,
    @InjectRepository(OptionEntity)
    private readonly optionRepository: Repository<OptionEntity>,
    @InjectRepository(VariantEntity)
    private readonly variantRepository: Repository<VariantEntity>,
  ) {}

  async create(dto: CreateGoodDto) {
    const shop = await this.shopRepository.findOne({
      where: {
        id: dto.shopId,
      },
    });
    if (!shop) throw new BadRequestException('Магазин не найден');

    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });
    if (!category) throw new BadRequestException('Категория не найдена');

    const photos = dto?.linksOfPhoto;
    delete dto?.linksOfPhoto;

    const newProduct = this.goodsRepository.create(dto);
    newProduct.category = category;
    newProduct.shop = shop;
    const savedProduct = await this.goodsRepository.save(newProduct);

    if (photos && photos.length > 0) {
      const photoPromises = photos.map(async (link) => {
        const photo = new PhotoGoodsEntity();
        photo.photoLink = link;
        photo.goods = savedProduct;
        return await this.filesRepository.save(photo);
      });

      await Promise.all(photoPromises);
    }

    return { message: 'Успешно' };
  }

  async findAll(id: string) {
    const shop = await this.shopRepository.findOne({
      where: { id },
    });

    if (!shop) throw new BadRequestException('Магазин не найден');

    const goods = await this.goodsRepository.find({
      where: { shop: { id: shop.id } },
      order: {
        createdDate: 'DESC',
      },
      relations: { photoLinks: true, category: true },
    });

    return goods;
  }

  findOne(id: string) {
    return `This action returns a #${id} good`;
  }

  async update(id: string, dto: UpdateGoodDto) {
    const product = await this.goodsRepository.findOne({ where: { id } });

    if (!product) throw new BadRequestException('Товар не найдена');

    await this.goodsRepository.update(id, dto);

    return { messge: 'success' };
  }

  async remove(id: string) {
    const relatedTables = [
      this.filesRepository,
      this.optionRepository,
      this.variantRepository,
    ];

    await Promise.all(
      relatedTables.map(async (table) => {
        await table.delete({ goods: { id } });
      }),
    );

    await this.goodsRepository.delete(id);
    return { messge: 'success' };
  }
}
