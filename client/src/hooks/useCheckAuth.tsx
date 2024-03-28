import { useEffect, useState } from 'react'
import { getTokenStorage, saveTokenStorage } from '../service/auth/Auth.helpers'
import { AuthService } from '../service/auth/Auth.service'
import { useUserStore } from '../store/user.state'

export const useCheckAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { saveUser } = useUserStore(store => store)

  useEffect(() => {
    const token = getTokenStorage()

    const fetchRefresh = async () => {
      const data = await AuthService.refresh()
      saveUser(data)
      saveTokenStorage(data.accessToken)
    }

    if (token) {
      setIsLoading(true)
      fetchRefresh()
    }

    setTimeout(() => {
      setIsLoading(false)
    }, 400)
  }, [saveUser])

  return { isLoading }
}
