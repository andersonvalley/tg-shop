import { GoodsEntity } from 'src/goods/entities/good.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('variant')
export class VariantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ default: '' })
  article: string;

  @Column()
  price: string;

  @Column({ default: '' })
  weight: string;

  @Column({ default: '' })
  quantity: string;

  @Column({ default: '' })
  vendorCode: string;

  @ManyToOne(() => GoodsEntity, (goods) => goods.variants)
  goods: GoodsEntity;
}
