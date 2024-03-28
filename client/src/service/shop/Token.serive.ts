import { instance } from '../api.config'
import { IToken } from './Token.interface'

export class TokenService {
  static async sendToken(token: IToken) {
    const response = await instance('/shop/token', {
      method: 'POST',
      data: token,
    })

    return response.data
  }
}
