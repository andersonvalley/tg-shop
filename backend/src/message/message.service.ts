import { Injectable } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { SubscriberEntity } from 'src/subscriber/entities/subscriber.entity';
import { sendMessage } from 'src/shops/Bot';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
    @InjectRepository(ShopEntity)
    private readonly shopRepository: Repository<ShopEntity>,
    @InjectRepository(SubscriberEntity)
    private readonly subscriberRepository: Repository<SubscriberEntity>,
  ) {}

  async findAll(id: string) {
    const messages = await this.messageRepository.find({
      where: {
        bot_: { id },
      },
      relations: { subscriber_: true },
      order: {
        created_date: 'DESC',
      },
    });

    const subscribersMap: { [id: string]: any } = {};

    messages.forEach((item) => {
      const subscriberId = item.subscriber_.id;
      if (
        !subscribersMap[subscriberId] ||
        subscribersMap[subscriberId].created_date < item.created_date
      ) {
        subscribersMap[subscriberId] = {
          text: item.text,
          subscriber: item.subscriber_,
          created_date: item.created_date,
        };
      }
    });

    const uniqueSubscribers = Object.values(subscribersMap);

    return uniqueSubscribers;
  }

  async findOne(id: string) {
    const messages = await this.messageRepository.find({
      where: {
        subscriber_: { id },
      },
      relations: { subscriber_: true },
      order: {
        created_date: 'ASC',
      },
    });

    return messages;
  }

  async create(dto: CreateMessageDto) {
    const shop = await this.shopRepository.findOne({
      where: { id: dto.shopId },
    });

    const subscriber = await this.subscriberRepository.findOne({
      where: { id: dto.subscriberId },
    });

    const message = this.messageRepository.create(dto);
    message.bot_ = shop;
    message.subscriber_ = subscriber;

    await this.messageRepository.save(message);

    await sendMessage({ ID: message.id });

    return { message: 'success' };
  }
}
