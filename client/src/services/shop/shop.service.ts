import { instance } from '../api/api.config'
import { IShop, IToken, IUpdateShopRequest } from '../../types/shop.interface'

export class ShopService {
  static async getAll() {
    const response = await instance<IShop[]>('/shop', {
      method: 'GET',
    })

    return response.data
  }

  static async getById(id: string) {
    const response = await instance(`/shop/${id}`, {
      method: 'GET',
    })

    return response.data
  }

  static async update(data: IUpdateShopRequest) {
    const response = await instance(`/shop/${data.shopId}`, {
      method: 'PATCH',
      data,
    })

    return response.data
  }

  static async delete(id: string) {
    const response = await instance(`/shop/${id}`, {
      method: 'DELETE',
    })

    return response.data
  }

  static async sendToken(token: IToken) {
    const response = await instance('/shop/token', {
      method: 'POST',
      data: token,
    })

    return response.data
  }
}
