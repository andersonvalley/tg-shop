import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { Repository } from 'typeorm';
import { PromocodeEntity } from './entities/promocode.entity';
import { CreatePromocodeDto } from './dto/create-promocode.dto';
import { UpdatePromocodeDto, ValidateDto } from './dto/update-promocode.dto';

@Injectable()
export class PromocodeService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(PromocodeEntity)
    private readonly promocodeRepository: Repository<PromocodeEntity>,
  ) {}

  async create(createPromocodeDto: CreatePromocodeDto, id: string) {
    const shop = await this.shopRepository.findOne({
      where: { id },
    });

    if (!shop) throw new BadRequestException('Магазин не найден');

    const newPromocode = this.promocodeRepository.create(createPromocodeDto);
    newPromocode.shop = shop;

    await this.promocodeRepository.save(newPromocode);

    return { message: 'Успешно' };
  }

  async findAll(id: string) {
    const delivery = await this.promocodeRepository.find({
      where: { shop: { id } },
      order: {
        title: 'ASC',
      },
    });

    if (!delivery) throw new BadRequestException('Неизвестная ошибка');

    return delivery;
  }

  async update(id: string, updatePromocodeDto: UpdatePromocodeDto) {
    const delivery = await this.promocodeRepository.findOne({ where: { id } });

    if (!delivery) throw new BadRequestException('Способ доставки не найдена');

    await this.promocodeRepository.update(id, updatePromocodeDto);

    return { messge: 'success' };
  }

  async remove(id: string) {
    await this.promocodeRepository.delete(id);
    return { messge: 'success' };
  }

  async validatePromocode(dto: ValidateDto) {
    const shop = await this.shopRepository.findOne({
      where: { id: dto.shopId, promocodes: { title: dto.promocode } },
      relations: { promocodes: true },
    });

    if (!shop) throw new BadRequestException('Промокод не действителен');

    const promocode = shop.promocodes[0];

    if (!promocode.isActive)
      throw new BadRequestException('Промокод не действителен');

    if (+dto.sum < +promocode.orderFrom)
      throw new BadRequestException(
        `Заказ меньше минимальной суммы заказа ${promocode.orderFrom} руб.`,
      );

    return {
      discount: promocode.discount,
      discountBy: promocode.discountBy,
      orderFrom: promocode.orderFrom,
      apply: promocode.apply,
    };
  }
}
