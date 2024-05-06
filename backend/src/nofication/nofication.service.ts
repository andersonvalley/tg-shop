import { Injectable } from '@nestjs/common';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from './entities/nofication.entity';

@Injectable()
export class NoficationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepository: Repository<NotificationEntity>,
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  get() {
    return 'This action adds a new nofication';
  }
}
