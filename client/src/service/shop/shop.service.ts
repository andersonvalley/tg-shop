import { instance } from '../api.config'
import { IToken } from './Token.interface'
import { IShop, IUpdateShopRequest } from './shop.interface'

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

  static async update(id: string, data: IUpdateShopRequest) {
    const response = await instance(`/shop/${id}`, {
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
