import { createICart, iCart, iCartResponse, updateICart } from '@/src/types/cart.interface'
import { categoryResponse } from '@/src/types/category.interface'
import { instance } from '../api/api.config'

export class CartService {
  static async create(data: createICart) {
    const response = await instance<categoryResponse>(`/cart`, {
      method: 'POST',
      data,
    })

    return response.data
  }

  static async getAll(subscriberId: string) {
    if (!subscriberId) return

    const response = await instance<iCart[]>(`/cart/${subscriberId}`, {
      method: 'GET',
    })

    return response.data
  }

  static async deleteAll(id: string) {
    const response = await instance<iCartResponse>(`/cart/${id}`, {
      method: 'DELETE',
    })

    return response.data
  }

  static async update(data: updateICart) {
    const response = await instance<iCartResponse>(`/cart/${data.id}`, {
      method: 'PATCH',
      data,
    })

    return response.data
  }
}
