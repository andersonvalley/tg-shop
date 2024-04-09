import { UserEntity } from 'src/auth/entities/user.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { DeliveryEntity } from 'src/delivery/entities/delivery.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('shop')
export class ShopEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column({ unique: true })
  token: string;

  @Column({ unique: true })
  botId: string;

  @Column()
  firstName: string;

  @Column()
  username: string;

  @Column({ default: 'Меню' })
  titleButton: string;

  @Column({ default: '' })
  webLink: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => UserEntity, (user) => user.shops)
  user: UserEntity;

  @OneToMany(() => CategoryEntity, (category) => category.shop)
  categories: CategoryEntity;

  @OneToMany(() => DeliveryEntity, (delivery) => delivery.shop)
  delivery: DeliveryEntity;
}
