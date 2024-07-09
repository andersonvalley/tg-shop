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

  @Column()
  goods_id: string;

  @Column()
  variant_id: string;

  @Column()
  options_id: string;

  @Column()
  quantity_cart: number;

  @ManyToOne(() => SubscriberEntity, (subscriber) => subscriber.cart)
  subscriber_: SubscriberEntity;
}
