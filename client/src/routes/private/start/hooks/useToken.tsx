import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { IToken } from '../../../../service/shop/Token.interface'
import { IUserResponseError } from '../../../../service/auth/Auth.interface'
import { ShopService } from '../../../../service/shop/shop.service'
import { QUERY_KEY } from '../../../../constants/constants'

export const useToken = () => {
  const client = useQueryClient()

  const { mutate, error } = useMutation({
    mutationFn: (value: IToken) => ShopService.sendToken(value),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllShops] })
    },
    onError: (error: AxiosError<IUserResponseError>) => console.log(error.response?.data),
  })

  return { mutate, error }
}
