import { useEffect, useState } from 'react'
import { getTokenStorage, saveTokenStorage } from '../service/auth/Auth.helpers'
import { AuthService } from '../service/auth/Auth.service'
import { useUserStore } from '../store/user.state'
import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { privateRoutes } from '../routes/config/Routes'
import { APP_PATH } from '../routes/config/Paths'

export const useCheckAuth = () => {
  const { saveUser, accessToken } = useUserStore(store => store)
  const [pathBeforeLoad, setPathBeforeLoad] = useState<string | undefined>('')

  const navigate = useNavigate()
  const location = useLocation()

  const { mutate: fetchRefresh, status } = useMutation({
    mutationFn: AuthService.refresh,
    onSettled: () => {
      const path = location.pathname
      const isExist = privateRoutes.find(route => route.path === path)

      if (isExist) {
        setPathBeforeLoad(path)
      }
    },
    onSuccess: data => {
      saveUser(data)
      saveTokenStorage(data.accessToken)
      if (pathBeforeLoad) {
        navigate(pathBeforeLoad)
      } else {
        navigate(APP_PATH.START, { replace: true })
      }
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
