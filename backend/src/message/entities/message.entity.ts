import { Injectable } from '@nestjs/common';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { SubscriberEntity } from 'src/subscriber/entities/subscriber.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Injectable()
@Entity('message')
export class MessageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_date: Date;

  @Column()
  text: string;

  @Column({ default: true })
  is_from_user: boolean;

  @ManyToOne(() => SubscriberEntity, (subscriber) => subscriber.messages)
  subscriber_: SubscriberEntity;

  @ManyToOne(() => ShopEntity, (shop) => shop)
  bot_: ShopEntity;
}
