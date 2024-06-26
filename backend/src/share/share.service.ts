import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateShareDto } from './dto/create-share.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ShareEntity } from './entities/share.entity';
import { Repository } from 'typeorm';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { startShare } from 'src/shops/Bot';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(ShareEntity)
    private readonly shareRepository: Repository<ShareEntity>,
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
  ) {}

  async create(dto: CreateShareDto) {
    const shop = await this.shopRepository.findOne({
      where: { id: dto.shopId },
    });

    const share = this.shareRepository.create(dto);
    share.shop_ = shop;
    await this.shareRepository.save(share);

    startShare({ ID: share.id });

    return { message: 'Success' };
  }

  async findAll(id: string) {
    const shares = await this.shareRepository.find({
      where: {
        shop_: { id },
      },
      order: {
        createdDate: 'DESC',
      },
    });

    if (!shares) throw new BadRequestException('Не найдены рассылки');

    return shares;
  }
}
