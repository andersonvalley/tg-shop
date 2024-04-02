import { instance } from '../api.config'
import { ICategory, categoryResponse, createCategory, updateCategory } from './category.interface'

export class CategoryService {
  static async create(dto: createCategory) {
    if (!dto.shopId) return

    const response = await instance<categoryResponse>(`/category/${dto.shopId}`, {
      method: 'POST',
      data: { title: dto.title, order: dto.order },
    })

    return response.data
  }

  static async getAll(shopId: string) {
    if (!shopId) return

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

  static async update(dto: updateCategory) {
    const response = await instance<categoryResponse>(`/category/${dto.id}`, {
      method: 'PATCH',
      data: { title: dto.title, order: dto.order },
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
