import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { IToken } from '@/src/types/shop.interface'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { ShopService } from '@/src/services/shop/shop.service'
import { IUserResponseError } from '@/src/types/auth.interface'
import { message } from 'antd'
import { useModalStore } from '@/src/store/modal.store'

export const useToken = () => {
  const client = useQueryClient()
  const { setToogleModal } = useModalStore(store => store)

  const { mutate, error, status } = useMutation({
    mutationFn: (value: IToken) => ShopService.sendToken(value),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllShops] })
      message.success('Магазин создан')
      setToogleModal()
    },
    onError: (error: AxiosError<IUserResponseError>) => {
      message.error('Ошибка')
      console.log(error.response?.data)
    },
  })

  return { mutate, error, status }
}
