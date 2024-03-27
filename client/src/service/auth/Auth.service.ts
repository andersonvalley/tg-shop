import { AxiosResponse } from 'axios'
import { instance } from '../api.config'
import { ILoginRequest, IUser } from './auth.interface'

export class AuthService {
  static async login(code: ILoginRequest) {
    const response = await instance<AxiosResponse<IUser>>('/auth', {
      method: 'POST',
      data: code,
    })

    return response.data
  }

  static async logut() {
    const response = await instance('/auth/logout', {
      method: 'POST',
    })

    return response.data
  }

  static async refresh() {
    const response = await instance(`/auth/refresh`, {
      method: 'POST',
      withCredentials: true,
    })

    return response
  }
}
