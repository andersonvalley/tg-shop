import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriberEntity } from './entities/subscriber.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(SubscriberEntity)
    private readonly subscriberRepository: Repository<SubscriberEntity>,
  ) {}

  async findAll(id: string) {
    const subscribers = await this.subscriberRepository.find({
      where: { shop_: { id } },
      order: {
        created_date: 'ASC',
      },
    });

    if (!subscribers) throw new BadRequestException('Не найден магазин');

    return subscribers;
  }
}
