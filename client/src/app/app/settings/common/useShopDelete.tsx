import { QUERY_KEY } from '@/src/constants/queryKey'
import { ShopService } from '@/src/services/shop/shop.service'
import { IUserResponseError } from '@/src/types/auth.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useDeleteShop = () => {
  const client = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (id: string) => ShopService.delete(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllShops] })
    },
    onError: (error: AxiosError<IUserResponseError>) => console.log(error.response?.data),
  })

  return { mutate }
}
