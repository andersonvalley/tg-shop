import { Injectable } from '@nestjs/common';
import { noficationDto } from './dto/create-nofication.dto';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NoficationEntity } from './entities/nofication.entity';

@Injectable()
export class NoficationService {
  constructor(
    @InjectRepository(NoficationEntity)
    private readonly notificationRepository: Repository<NoficationEntity>,
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  get() {
    return 'This action adds a new nofication';
  }
}
