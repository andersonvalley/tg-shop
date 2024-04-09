import { ShopEntity } from 'src/shops/entities/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('promocod')
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

  @ManyToOne(() => ShopEntity, (shop) => shop.promocodes)
  shop: ShopEntity;
}
