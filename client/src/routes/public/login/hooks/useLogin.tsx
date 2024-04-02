import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ILoginRequest, IUserResponseError } from '../../../../service/auth/Auth.interface'
import { AxiosError } from 'axios'
import { saveTokenStorage } from '../../../../service/auth/Auth.helpers'
import { useUserStore } from '../../../../store/user.state'
import { useNavigate } from 'react-router-dom'
import { APP_PATH } from '../../../config/Paths'
import { AuthService } from '../../../../service/auth/Auth.service'
import { QUERY_KEY } from '../../../../constants/constants'
import { useShopStore } from '../../../../store/shop.state'
import { useEffect } from 'react'

export const useLogin = () => {
  const { saveUser, accessToken } = useUserStore(store => store)
  const { shops } = useShopStore(store => store)
  const navigate = useNavigate()
  const client = useQueryClient()

  const { mutate, isError, error } = useMutation({
    mutationFn: (code: ILoginRequest) => AuthService.login(code),
    onError: (error: AxiosError<IUserResponseError>) => console.log(error.response?.data.message),
    onSuccess: data => {
      saveUser(data)
      saveTokenStorage(data.accessToken)
      navigate(APP_PATH.START)
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllShops] })
    },
  })

  useEffect(() => {
    if (shops.length > 0 && accessToken) {
      navigate(`/catalog/${shops[0].id}`)
    }
  }, [shops])

  return { mutate, isError, error }
}
