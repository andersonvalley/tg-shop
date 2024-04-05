import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { IToken } from '@/src/types/shop.interface'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { ShopService } from '@/src/services/shop/shop.service'
import { IUserResponseError } from '@/src/types/auth.interface'

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
