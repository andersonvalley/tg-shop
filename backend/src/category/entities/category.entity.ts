import { GoodsEntity } from 'src/goods/entities/good.entity';
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

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  title: string;

  @Column()
  order: number;

  @ManyToOne(() => ShopEntity, (shop) => shop.categories)
  shop: ShopEntity;

  @OneToMany(() => GoodsEntity, (good) => good.category)
  goods: GoodsEntity;
}
