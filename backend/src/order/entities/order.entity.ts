import { ShopEntity } from 'src/shops/entities/shop.entity';
import { SubscriberEntity } from 'src/subscriber/entities/subscriber.entity';
import {
  BeforeInsert,
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

  @Column()
  number: string;

  @Column({ default: 'Новый' })
  status: string;

  @Column()
  amount: string;

  @Column()
  username: string;

  @Column()
  firtname: string;

  @Column()
  paymentBy: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.orders)
  shop: ShopEntity;

  @ManyToOne(() => SubscriberEntity, (subscriber) => subscriber.orders)
  subscriber: SubscriberEntity;

  @BeforeInsert()
  async incrementNumberBeforeInsert() {
    const currentNumber = parseInt(this.number);
    if (!isNaN(currentNumber)) {
      this.number = (currentNumber + 1).toString();
    } else {
      console.error('Значение поля number не является числом');
    }
  }
}
