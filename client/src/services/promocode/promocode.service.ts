import { instance } from '../api/api.config'
import { IDelivery } from '@/src/types/delivery.interface'
import { IPromocode, promocodeResponse } from '@/src/types/promocode.interface'

export class PromocodeService {
  static async create(data: IPromocode) {
    const response = await instance<promocodeResponse>(`/promocode/${data.shopId}`, {
      method: 'POST',
      data,
    })

    return response.data
  }

  static async getAll(shopId: string) {
    if (!shopId) return []

    const response = await instance<IPromocode[]>(`/promocode/${shopId}`, {
      method: 'GET',
    })

    return response.data
  }

  static async update(data: IPromocode) {
    const response = await instance<promocodeResponse>(`/promocode/${data.id}`, {
      method: 'PATCH',
      data,
    })

    return response.data
  }

  static async delete(id: string) {
    const response = await instance<promocodeResponse>(`/promocode/${id}`, {
      method: 'DELETE',
    })

    return response.data
  }
}
