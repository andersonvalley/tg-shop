import { Injectable } from '@nestjs/common';
import { noficationDto } from './dto/create-nofication.dto';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class NoficationService {
  @InjectRepository(ShopEntity)
  private readonly shopRepository: Repository<ShopEntity>,

  get(dto: noficationDto) {
    return 'This action adds a new nofication';
  }
}
