import { DeliveryEntity } from 'src/delivery/entities/delivery.entity';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { PromocodeEntity } from 'src/promocodes/entities/promocode.entity';
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

  @PrimaryGeneratedColumn('increment')
  public number: number;

  @Column({ default: 'Новый' })
  status: string;

  @Column({ default: false })
  isPayed: boolean;

  @Column()
  phone: string;

  @Column({ default: '' })
  comment: string;

  @Column()
  products: string;

  @Column()
  totalPrice: string;

  @ManyToOne(() => PromocodeEntity, (promocode) => promocode.order)
  promocode: PromocodeEntity;

  @ManyToOne(() => DeliveryEntity, (delivery) => delivery.order)
  delivery: DeliveryEntity;

  @ManyToOne(() => PaymentEntity, (payment) => payment.order)
  payment: PaymentEntity;

  @ManyToOne(() => ShopEntity, (shop) => shop.orders)
  shop: ShopEntity;

  @ManyToOne(() => SubscriberEntity, (subscriber) => subscriber.orders)
  subscriber: SubscriberEntity;
}
