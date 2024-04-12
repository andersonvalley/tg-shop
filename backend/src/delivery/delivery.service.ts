import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { Repository } from 'typeorm';
import { DeliveryEntity } from './entities/delivery.entity';
import { getDeliveryDto } from './dto/get-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(DeliveryEntity)
    private readonly deliveryRepository: Repository<DeliveryEntity>,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto, id: string) {
    const shop = await this.shopRepository.findOne({
      where: { id },
    });

    if (!shop) throw new BadRequestException('Магазин не найден');

    const newDelivery = this.deliveryRepository.create(createDeliveryDto);
    newDelivery.shop = shop;

    await this.deliveryRepository.save(newDelivery);

    return { message: 'Успешно' };
  }

  async findAll(id: string) {
    const delivery = await this.deliveryRepository.find({
      where: { shop: { id } },
      order: {
        title: 'ASC',
      },
    });

    if (!delivery) throw new BadRequestException('Неизвестная ошибка');

    return delivery;
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
    const delivery = await this.deliveryRepository.findOne({ where: { id } });

    if (!delivery) throw new BadRequestException('Способ доставки не найдена');

    await this.deliveryRepository.update(id, updateDeliveryDto);

    return { messge: 'success' };
  }

  async remove(id: string) {
    await this.deliveryRepository.delete(id);
    return { messge: 'success' };
  }
}
