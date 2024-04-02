import { useEffect } from 'react'
import { getTokenStorage, saveTokenStorage } from '../service/auth/Auth.helpers'
import { AuthService } from '../service/auth/Auth.service'
import { useUserStore } from '../store/user.state'
import { useMutation } from '@tanstack/react-query'

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
