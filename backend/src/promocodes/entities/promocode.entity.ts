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

@Entity('promocode')
export class PromocodeEntity {
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

  @Column()
  apply: string;

  @Column()
  discount: string;

  @Column()
  discountBy: string;

  @Column({ default: '0' })
  orderFrom: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 0 })
  order: number;

  @OneToMany(() => OrderEntity, (order) => order.promocode)
  orders: OrderEntity[];

  @ManyToOne(() => ShopEntity, (shop) => shop.promocodes)
  shop: ShopEntity;
}
