import { instance } from '../api/api.config'
import { IShop, IToken, IUpdateShopRequest } from '../../types/shop.interface'
import { ISubscriber } from '@/src/types/subscribers.interface'

export class SubscriberService {
  static async getAll(id: string) {
    if (!id) return []

    const response = await instance<ISubscriber[]>(`/subscriber/${id}`, {
      method: 'GET',
    })

    return response.data
  }

  static async getById(id: string) {
    if (!id) return

    const response = await instance<ISubscriber>(`/subscriber/get/${id}`, {
      method: 'GET',
    })

    return response.data
  }
}
