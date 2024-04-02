import { CategoryEntity } from 'src/category/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
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

  @Column({ default: '' })
  price: string;

  @Column({ default: '' })
  weight: string;

  @Column({ default: '' })
  quantity: string;

  @Column({ default: '' })
  vendorCode: string;

  @ManyToOne(() => CategoryEntity, (category) => category.goods)
  category: CategoryEntity;
}
