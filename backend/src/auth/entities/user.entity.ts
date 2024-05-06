import { ShopEntity } from 'src/shops/entities/shop.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  telegram_id: string;

  @Column({ default: '' })
  first_name?: string;

  @Column({ default: '' })
  last_name?: string;

  @Column({ default: '' })
  user_name?: string;

  @Column({ default: false })
  is_premium?: boolean;

  @Column({ default: '' })
  language_code?: string;

  @Column({ default: '' })
  avatar_url?: string;

  @CreateDateColumn()
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @OneToMany(() => ShopEntity, (shop) => shop.user_)
  shops_: ShopEntity;
}
