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

  @Column()
  telegramId: string;

  @Column({ default: '' })
  firstName?: string;

  @Column({ default: '' })
  lastName?: string;

  @Column({ default: '' })
  userName?: string;

  @Column({ default: false })
  isPremium?: boolean;

  @Column({ default: '' })
  languageCode?: string;

  @Column({ default: '' })
  avatarUrl?: string;

  @Column({ default: null })
  code: number | null;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany(() => ShopEntity, (shop) => shop.user)
  shops: ShopEntity;
}
