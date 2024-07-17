import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  async create(dto: CreateOrderDto) {
    const shop = await this.shopRepository.findOne({
      where: { id: dto.shopId },
    });
  }

  async findAll() {
    return `This action returns all order`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }
}
