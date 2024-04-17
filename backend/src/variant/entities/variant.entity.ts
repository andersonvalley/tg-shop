import { GoodsEntity } from 'src/goods/entities/good.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('variant')
export class VariantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  titleVariant: string;

  @Column()
  article: string;

  @Column()
  price: string;

  @Column()
  weight: string;

  @Column()
  quantity: string;

  @ManyToOne(() => GoodsEntity, (goods) => goods.variants)
  goods: GoodsEntity;
}
