import { GoodsEntity } from 'src/goods/entities/good.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('option')
export class OptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: '' })
  title: string;

  @Column({ default: '' })
  price: string;

  @ManyToOne(() => GoodsEntity, (goods) => goods.options)
  goods: GoodsEntity;
}
