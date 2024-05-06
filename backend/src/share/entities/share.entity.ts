import { ShopEntity } from 'src/shops/entities/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('share')
export class ShareEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  text: string;

  @Column()
  addButton: boolean;

  @Column({ default: '' })
  photoLink: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.share)
  shop_: ShopEntity;
}
