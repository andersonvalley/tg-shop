import { ShopEntity } from 'src/shops/entities/shop.entity';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('subscriber')
export class SubscriberEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @Column()
  number: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.subscribers)
  shop: ShopEntity;

  @BeforeInsert()
  async incrementNumberBeforeInsert() {
    const currentNumber = parseInt(this.number);
    if (!isNaN(currentNumber)) {
      this.number = (currentNumber + 1).toString();
    } else {
      console.error('Значение поля number не является числом');
    }
  }
}
