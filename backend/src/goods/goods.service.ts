import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGoodDto } from './dto/create-good.dto';
import { UpdateGoodDto } from './dto/update-good.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { GoodsEntity } from './entities/good.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { VariantEntity } from 'src/variant/entities/variant.entity';
import { OptionEntity } from 'src/option/entities/option.entity';
import { QueryGoodDto } from './dto/query-good.dto';
import { FilesEntity } from 'src/files/entities/photo-good.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsEntity)
    private readonly goodsRepository: Repository<GoodsEntity>,
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(FilesEntity)
    private readonly filesRepository: Repository<FilesEntity>,
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

    const photos = dto?.photoLinks;
    delete dto?.photoLinks;

    const newProduct = this.goodsRepository.create({
      ...dto,
      photoLinks: new FilesEntity(),
    });
    newProduct.category = category;
    newProduct.shop = shop;
    const savedProduct = await this.goodsRepository.save(newProduct);

    if (photos && photos.length > 0) {
      const photoPromises = photos.map(async (link) => {
        const photo = new FilesEntity();
        photo.link = link;
        photo.goods = savedProduct;
        return await this.filesRepository.save(photo);
      });

      await Promise.all(photoPromises);
    }

    return { message: 'Успешно' };
  }

  async findAll(id: string, query: QueryGoodDto) {
    const shop = await this.shopRepository.findOne({
      where: { id },
    });

    if (!shop) throw new BadRequestException('Магазин не найден');

    const searchCriteria: any = { shop: { id: shop.id } };

    if (query.search) {
      searchCriteria.title = ILike(`%${query.search.toLowerCase()}%`);
    }

    const sortBy = query.sortBy ? query.sortBy : 'createdDate';
    const sortByType = query.sortByType ? query.sortByType : 'ASC';

    if (query.category) {
      const category = await this.categoryRepository.findOne({
        where: { id: query.category },
        relations: { goods: { photoLinks: true } },
        order: {
          goods: { [sortBy]: sortByType },
        },
      });
      if (!category) throw new BadRequestException('Категория не найдена');
      searchCriteria.category = category;

      return category.goods;
    }

    const goods = await this.goodsRepository.find({
      where: searchCriteria,
      order: {
        [sortBy]: sortByType,
      },
      relations: { photoLinks: true, category: true },
    });

    return goods;
  }

  async findOne(id: string) {
    const product = await this.goodsRepository.findOne({
      where: { id },
      relations: { photoLinks: true, variants: true, options: true },
    });

    if (!product) throw new BadRequestException('Товар не найден');

    return product;
  }

  async update(id: string, dto: UpdateGoodDto) {
    const product = await this.goodsRepository.findOne({ where: { id } });

    if (!product) throw new BadRequestException('Товар не найдена');

    await this.filesRepository.delete({ goods: { id: product.id } });

    const category = await this.categoryRepository.findOne({
      where: { id: dto.categoryId },
    });

    await this.goodsRepository.update(id, {
      title: dto.title,
      description: dto.description,
      price: dto.price,
      weight: dto.weight,
      quantity: dto.quantity,
      discount: dto.discount,
      vendorCode: dto.vendorCode,
      category: category,
    });

    if (dto.photoLinks && dto.photoLinks.length > 0) {
      const photoPromises = dto.photoLinks.map(async (link) => {
        const photo = new FilesEntity();
        photo.link = link;
        photo.goods = product;
        return await this.filesRepository.save(photo);
      });

      await Promise.all(photoPromises);
    }

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
