import { ISubscriber } from './subscribers.interface'

export interface IOrder {
  id: string
  createdDate: string
  updatedDate: string
  shopId: string
  subscriberId: string
  deliveryId: string
  paymentId: string
  promocodeId: string
  promocodeDiscount: string
  totalPrice: string
  comment: string
  phone: string
  isPayed: boolean
  status: string
}

export interface ICreateOrder {
  shopId: string
  subscriberId: string
  deliveryId: string
  paymentId: string
  promocodeId: string
  comment: string
  phone: string
  products: string
  totalPrice: string
}

export interface IUpdateOrder {
  id: string
  status: string
  totalPrice: string
  paymentBy: string
  shopId?: string
}

export interface IOrderResponse {
  message: string
}
