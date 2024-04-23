import { instance } from '../api/api.config'
import { IGood, createOrUpdateIGood, responseMessage } from '../../types/goods.interface'
import { useSearchAndSortStore } from '@/src/app/(webApp)/store/searchAndSort'

export class GoodsService {
  static async create(data: createOrUpdateIGood) {
    const response = await instance<responseMessage>(`/goods`, {
      method: 'POST',
      data,
    })

    return response.data
  }

  static async getAll(shopId: string, search: string, category: string, sortBy: string, sortByType: string) {
    if (!shopId) return []

    const response = await instance<IGood[]>(`/goods/${shopId}`, {
      params: {
        search,
        category,
        sortBy,
        sortByType,
      },
      method: 'GET',
    })

    return response.data
  }

  static async getById(id: string) {
    const response = await instance<IGood>(`/goods/${id}`, {
      method: 'GET',
    })

    return response.data
  }

  static async update(data: createOrUpdateIGood) {
    const response = await instance<responseMessage>(`/goods/${data.id}`, {
      method: 'PATCH',
      data,
    })

    return response.data
  }

  static async delete(id: string) {
    const response = await instance<responseMessage>(`/goods/${id}`, {
      method: 'DELETE',
    })

    return response.data
  }
}
