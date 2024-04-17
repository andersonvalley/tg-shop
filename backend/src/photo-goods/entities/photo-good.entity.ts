import { GoodsEntity } from 'src/goods/entities/good.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('photo-goods')
export class PhotoGoodsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  photoLink: string;

  @ManyToOne(() => GoodsEntity, (link) => link.photoLinks)
  goods: GoodsEntity;
}
