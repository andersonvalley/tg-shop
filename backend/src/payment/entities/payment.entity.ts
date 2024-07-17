import { ShopEntity } from 'src/shops/entities/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  title: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => ShopEntity, (shop) => shop.payment)
  shop: ShopEntity;
}
