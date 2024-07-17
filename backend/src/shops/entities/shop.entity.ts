import { UserEntity } from 'src/auth/entities/user.entity';
import { CategoryEntity } from 'src/category/entities/category.entity';
import { DeliveryEntity } from 'src/delivery/entities/delivery.entity';
import { GoodsEntity } from 'src/goods/entities/good.entity';
import { MessageEntity } from 'src/message/entities/message.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { PaymentEntity } from 'src/payment/entities/payment.entity';
import { PromocodeEntity } from 'src/promocodes/entities/promocode.entity';
import { ShareEntity } from 'src/share/entities/share.entity';
import { SubscriberEntity } from 'src/subscriber/entities/subscriber.entity';
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
  created_date: Date;

  @UpdateDateColumn()
  updated_date: Date;

  @Column({ unique: true })
  token: string;

  @Column({ unique: true })
  bot_id: string;

  @Column()
  first_name: string;

  @Column()
  username: string;

  @Column({ default: '' })
  description: string;

  @Column({
    default: `Добро пожаловать 👋
Нажмите «Начать», чтобы ознакомиться с нашим ассортиментом.`,
  })
  greetings: string;

  @Column({
    default: `Здравствуйте 👋
Откройте меню, чтобы увидеть весь ассортимент.`,
  })
  first_launch: string;

  @Column({
    default: `💬 Менеджер скоро свяжется с вами`,
  })
  after_order: string;

  @Column({ default: 'Меню' })
  title_button: string;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => UserEntity, (user) => user.shops_)
  user_: UserEntity;

  @OneToMany(() => CategoryEntity, (category) => category.shop)
  categories: CategoryEntity;

  @OneToMany(() => DeliveryEntity, (delivery) => delivery.shop)
  delivery: DeliveryEntity;

  @OneToMany(() => PaymentEntity, (payment) => payment.shop)
  payment: PaymentEntity;

  @OneToMany(() => PromocodeEntity, (promocode) => promocode.shop)
  promocodes: PromocodeEntity[];

  @OneToMany(() => ShareEntity, (share) => share.shop_)
  share: ShareEntity;

  @OneToMany(() => SubscriberEntity, (share) => share.shop_)
  subscribers: SubscriberEntity;

  @OneToMany(() => MessageEntity, (message) => message.bot_)
  messages: MessageEntity;

  @OneToMany(() => OrderEntity, (order) => order.shop)
  orders: OrderEntity;

  @OneToMany(() => GoodsEntity, (goods) => goods.shop)
  goods: GoodsEntity;
}
