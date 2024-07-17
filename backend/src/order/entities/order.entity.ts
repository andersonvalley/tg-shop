import { ShopEntity } from 'src/shops/entities/shop.entity';
import { SubscriberEntity } from 'src/subscriber/entities/subscriber.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ default: 'Новый' })
  status: string;

  @Column()
  amount: string;

  @Column()
  username: string;

  @Column()
  firstname: string;

  @Column()
  paymentBy: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.orders)
  shop: ShopEntity;

  @ManyToOne(() => SubscriberEntity, (subscriber) => subscriber.orders)
  subscriber: SubscriberEntity;
}
