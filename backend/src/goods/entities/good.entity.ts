import { CategoryEntity } from 'src/category/entities/category.entity';
import { FilesEntity } from 'src/files/entities/photo-good.entity';
import { ShopEntity } from 'src/shops/entities/shop.entity';
import { VariantEntity } from 'src/variant/entities/variant.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('goods')
export class GoodsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  title: string;

  @Column({ default: '' })
  description?: string;

  @Column()
  price: number;

  @Column({ default: 0 })
  discount: number;

  @Column({ default: '' })
  weight: string;

  @Column({ default: '' })
  quantity: string;

  @Column({ default: '' })
  vendorCode: string;

  @OneToMany(() => FilesEntity, (link) => link.goods)
  photoLinks: FilesEntity;

  @OneToMany(() => VariantEntity, (variant) => variant.goods)
  variants: VariantEntity;

  @OneToMany(() => VariantEntity, (option) => option.goods)
  options: VariantEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.goods)
  category: CategoryEntity;

  @ManyToOne(() => ShopEntity, (shop) => shop.goods)
  shop: ShopEntity;
}
