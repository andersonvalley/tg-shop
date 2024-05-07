import { iCreateMessage, iMessage, iMessagesByUser, messageResponse } from '@/src/types/messages.interface'
import { instance } from '../api/api.config'

export class MessagesService {
  static async create(data: iCreateMessage) {
    const response = await instance<messageResponse>(`/messages`, {
      method: 'POST',
      data,
    })

    return response.data
  }

  static async getAll(shopId: string) {
    if (!shopId) return []

    const response = await instance<iMessagesByUser[]>(`/messages/${shopId}`, {
      method: 'GET',
    })

    return response.data
  }

  static async getById(shopId: string) {
    const response = await instance<iMessage[]>(`/messages/byId/${shopId}`, {
      method: 'GET',
    })

    return response.data
  }
}
