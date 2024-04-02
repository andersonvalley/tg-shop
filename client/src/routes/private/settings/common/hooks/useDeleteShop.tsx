import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '../../../../../constants/constants'
import { AxiosError } from 'axios'
import { IUserResponseError } from '../../../../../service/auth/Auth.interface'
import { ShopService } from '../../../../../service/shop/shop.service'
import { useNavigate } from 'react-router-dom'
import { APP_PATH, DYNAMIC_LINK } from '../../../../config/Paths'
import { useShopStore } from '../../../../../store/shop.state'

export const useDeleteShop = () => {
  const client = useQueryClient()
  const navigate = useNavigate()
  const { shops, currentShop } = useShopStore(store => store)

  const { mutate } = useMutation({
    mutationFn: (id: string) => ShopService.delete(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllShops] })
      if (shops.length === 1) {
        navigate(APP_PATH.START)
      } else navigate(DYNAMIC_LINK(currentShop.id).CATALOG)
    },
    onError: (error: AxiosError<IUserResponseError>) => console.log(error.response?.data),
  })

  return { mutate }
}
