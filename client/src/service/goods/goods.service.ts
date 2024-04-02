import { instance } from '../api.config'
import { ICategory, categoryResponse, createCategory } from '../category/category.interface'
import { IGood } from './goods.interface'

export class GoodsService {
  static async create(shopId: string, data: createCategory) {
    const response = await instance<IGood[]>(`/goods/${shopId}`, {
      method: 'POST',
      data,
    })

    return response.data
  }

  static async getAll(shopId: string) {
    if (!shopId) return

    const response = await instance<IGood[]>(`/goods/${shopId}`, {
      method: 'GET',
    })

    return response.data
  }

  static async getById(id: string) {
    const response = await instance<ICategory>(`/goods/${id}`, {
      method: 'GET',
    })

    return response.data
  }

  static async update(id: string, data: createCategory) {
    const response = await instance<categoryResponse>(`/goods/${id}`, {
      method: 'PATCH',
      data,
    })

    return response.data
  }

  static async delete(id: string) {
    const response = await instance<categoryResponse>(`/goods/${id}`, {
      method: 'DELETE',
    })

    return response.data
  }
}
