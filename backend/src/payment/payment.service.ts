import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { Repository } from 'typeorm';
import { PaymentEntity } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
  ) {}

  async create(dto: CreatePaymentDto, id: string) {
    const shop = await this.shopRepository.findOne({
      where: { id },
    });

    if (!shop) throw new BadRequestException('Магазин не найден');

    const newPayment = this.paymentRepository.create(dto);
    newPayment.shop = shop;

    await this.paymentRepository.save(newPayment);

    return { message: 'Успешно' };
  }

  async findAll(id: string) {
    const payment = await this.paymentRepository.find({
      where: { shop: { id } },
      order: {
        title: 'ASC',
      },
    });

    if (!payment) throw new BadRequestException('Неизвестная ошибка');

    return payment;
  }

  async update(id: string, dto: UpdatePaymentDto) {
    const payment = await this.paymentRepository.findOne({ where: { id } });

    if (!payment) throw new BadRequestException('Способ оплаты не найден');

    await this.paymentRepository.update(id, dto);

    return { messge: 'success' };
  }

  async remove(id: string) {
    await this.paymentRepository.delete(id);
    return { messge: 'success' };
  }
}
