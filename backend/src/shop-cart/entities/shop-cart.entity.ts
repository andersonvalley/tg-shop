import { SubscriberEntity } from 'src/subscriber/entities/subscriber.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cart')
export class ShopCartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_date: Date;

  @Column({ unique: true })
  goods_id: string;

  @ManyToOne(() => SubscriberEntity, (subscriber) => subscriber.cart)
  subscriber_: SubscriberEntity;
}
