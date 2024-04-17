import { OrderEntity } from 'src/order/entities/order.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscriber')
export class SubscriberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @Column({ default: '' })
  first_name?: string;

  @Column({ default: '' })
  last_name?: string;

  @Column({ unique: true })
  telegram_id: string;

  @Column()
  username: string;

  @Column({ default: '' })
  avatar_url?: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.subscribers)
  shop_: ShopEntity;

  @OneToMany(() => OrderEntity, (order) => order.shop)
  orders: OrderEntity;
}
