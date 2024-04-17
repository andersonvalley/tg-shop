import { instance } from '../api/api.config'
import { ICategory, categoryResponse, createOrUpdateCategory } from '../../types/category.interface'

export class CategoryService {
  static async create(data: createOrUpdateCategory) {
    const response = await instance<categoryResponse>(`/category/${data.shopId}`, {
      method: 'POST',
      data,
    })

    return response.data
  }

  static async getAll(shopId: string) {
    if (!shopId) return []

    const response = await instance<ICategory[]>(`/category/${shopId}`, {
      method: 'GET',
    })

    return response.data
  }

  static async getById(id: string) {
    const response = await instance<ICategory>(`/category/${id}`, {
      method: 'GET',
    })

    return response.data
  }

  static async update(data: createOrUpdateCategory) {
    const response = await instance<categoryResponse>(`/category/${data.id}`, {
      method: 'PATCH',
      data,
    })

    return response.data
  }

  static async delete(id: string) {
    const response = await instance<categoryResponse>(`/category/${id}`, {
      method: 'DELETE',
    })

    return response.data
  }
}
