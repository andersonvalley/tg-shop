import { instance } from '../api.config'
import { ILoginRequest, IUserResponse } from './Auth.interface'

export class AuthService {
  static async login(code: ILoginRequest) {
    const response = await instance<IUserResponse>('/auth', {
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
    const response = await instance<IUserResponse>(`/auth/refresh`, {
      method: 'POST',
      withCredentials: true,
    })

    return response.data
  }
}
