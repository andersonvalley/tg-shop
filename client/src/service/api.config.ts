import axios from 'axios'
import { getTokenStorage, saveTokenStorage } from './auth/Auth.helpers'

export const BASE_URL = 'http://localhost:5501'

export const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
})

instance.interceptors.request.use(
  function (config) {
    const accessToken = getTokenStorage()

    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
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
        console.log('не авторизован')
      }
    }
    throw error
  }
)
