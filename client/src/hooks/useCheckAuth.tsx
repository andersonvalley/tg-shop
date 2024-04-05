import { useEffect } from 'react'
import { useUserStore } from '../store/user.state'
import { useMutation } from '@tanstack/react-query'
import { AuthService } from '../services/auth/auth.service'
import { getTokenStorage, saveTokenStorage } from '../services/auth/auth.helpers'

export const useCheckAuth = () => {
  const { saveUser, accessToken } = useUserStore(store => store)

  const { mutate: fetchRefresh, status } = useMutation({
    mutationFn: AuthService.refresh,
    onSuccess: data => {
      saveUser(data)
      saveTokenStorage(data.accessToken)
    },
  })

  useEffect(() => {
    const token = getTokenStorage()

    if (token) {
      fetchRefresh()
    }
  }, [fetchRefresh])

  return { status, accessToken }
}
