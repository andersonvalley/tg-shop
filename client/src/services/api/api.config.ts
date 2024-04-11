import axios from 'axios'
import { getTokenStorage, saveTokenStorage } from '../auth/auth.helpers'

export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND

const options = {
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
}

export const instance = axios.create(options)
export const instanceWithoutAuth = axios.create(options)

instance.interceptors.request.use(
  config => {
    const accessToken = getTokenStorage()

    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  config => {
    return config
  },
  async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const { data } = await axios(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          withCredentials: true,
        })
        saveTokenStorage(data.accessToken)
        return instance.request(originalRequest)
      } catch (error) {
        console.log('Не авторизован')
      }
    }
    throw error
  }
)
