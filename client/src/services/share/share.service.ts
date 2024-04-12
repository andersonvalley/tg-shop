import { instance } from '../api/api.config'
import { IDelivery } from '@/src/types/delivery.interface'
import { IPromocode, promocodeResponse } from '@/src/types/promocode.interface'
import { IShare, createShare, shareResponse, uploadImage } from '@/src/types/share.interface'

export class ShareService {
  static async create(data: createShare) {
    const response = await instance<shareResponse>(`/share`, {
      method: 'POST',
      data,
    })

    return response.data
  }

  static async getAll(shopId: string) {
    if (!shopId) return []

    const response = await instance<IShare[]>(`/share/${shopId}`, {
      method: 'GET',
    })

    return response.data
  }
}
