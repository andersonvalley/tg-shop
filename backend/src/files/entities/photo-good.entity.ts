import { GoodsEntity } from 'src/goods/entities/good.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('files')
export class FilesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  link: string;

  @ManyToOne(() => GoodsEntity, (link) => link.photoLinks)
  goods: GoodsEntity;
}
