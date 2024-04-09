import { instance } from '../api/api.config'
import { ICategory, categoryResponse, createCategory } from '../../types/category.interface'
import { IDelivery, deliveryResponse } from '@/src/types/delivery.interface'

export class DeliveryService {
  static async create(data: IDelivery) {
    const response = await instance<deliveryResponse>(`/delivery/${data.shopId}`, {
      method: 'POST',
      data,
    })

    return response.data
  }

  static async getAll(shopId: string) {
    if (!shopId) return []

    const response = await instance<IDelivery[]>(`/delivery/${shopId}`, {
      method: 'GET',
    })

    return response.data
  }

  static async update(data: IDelivery) {
    const response = await instance<categoryResponse>(`/delivery/${data.id}`, {
      method: 'PATCH',
      data,
    })

    return response.data
  }

  static async delete(id: string) {
    const response = await instance<categoryResponse>(`/delivery/${id}`, {
      method: 'DELETE',
    })

    return response.data
  }
}
