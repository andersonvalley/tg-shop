import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import { IToken } from '../../../../service/shop/Token.interface'
import { APP_PATH } from '../../../config/Paths'
import { IUserResponseError } from '../../../../service/auth/Auth.interface'
import { ShopService } from '../../../../service/shop/shop.service'
import { QUERY_KEY } from '../../../../constants/constants'

export const useToken = () => {
  const navigate = useNavigate()
  const client = useQueryClient()

  const { mutate, error } = useMutation({
    mutationFn: (value: IToken) => ShopService.sendToken(value),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllShops] })
      navigate(APP_PATH.CATALOG)
    },
    onError: (error: AxiosError<IUserResponseError>) => console.log(error.response?.data),
  })

  return { mutate, error }
}
