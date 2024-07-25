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

@Entity('delivery')
export class DeliveryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: '' })
  price: string;

  @Column({ default: '' })
  priceFrom: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  order: number;

  @Column({ default: false })
  name: boolean;

  @Column({ default: false })
  address: boolean;

  @Column({ default: false })
  phone: boolean;

  @Column({ default: false })
  comment: boolean;

  @OneToMany(() => OrderEntity, (order) => order.delivery)
  orders: OrderEntity[];

  @ManyToOne(() => ShopEntity, (shop) => shop.delivery)
  shop: ShopEntity;
}
