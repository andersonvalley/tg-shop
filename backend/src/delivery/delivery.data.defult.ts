import { CreateDeliveryDto } from './dto/create-delivery.dto';

export const delivery: CreateDeliveryDto = {
  title: 'Самовывоз',
  description: 'Адрес самовывоза: ул. Тестовая, д. 1',
  price: '0',
  priceFrom: '0',
  isActive: true,
  order: 0,
  name: false,
  address: false,
  phone: true,
  comment: true,
};

export const delivery2: CreateDeliveryDto = {
  title: 'Курьером',
  description: '',
  price: '0',
  priceFrom: '0',
  isActive: true,
  order: 1,
  name: true,
  address: true,
  phone: true,
  comment: true,
};
