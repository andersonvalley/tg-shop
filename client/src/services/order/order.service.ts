import { instance } from '../api/api.config'
import { ICreateOrder, IOrder, IOrderResponse, IUpdateOrder } from '@/src/types/order.interface'

export class OrderService {
  static async create(data: ICreateOrder) {
    const response = await instance<IOrderResponse>(`/order/${data.shopId}`, {
      method: 'POST',
      data,
    })

    return response.data
  }

  static async getAll(shopId: string) {
    if (!shopId) return []

    const response = await instance<IOrder[]>(`/order/${shopId}`, {
      method: 'GET',
    })

    return response.data
  }

  static async update(data: IUpdateOrder) {
    const response = await instance<IOrderResponse>(`/order/${data.id}`, {
      method: 'PATCH',
      data,
    })

    return response.data
  }
}
