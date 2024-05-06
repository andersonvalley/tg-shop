import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { useShopStore } from '@/src/store/shop.state'
import { ShopService } from '@/src/services/shop/shop.service'

export const useShop = () => {
  const { saveShops, saveCurrentShop, currentShop } = useShopStore(store => store)
  const { data, isSuccess, isError, isLoading } = useQuery({
    queryKey: [QUERY_KEY.getAllShops],
    queryFn: ShopService.getAll,
  })

  useEffect(() => {
    if (isSuccess && data.length) {
      saveShops(data)
      saveCurrentShop(data[0])
    }
  }, [data, isSuccess, saveShops, saveCurrentShop])

  return { data, isSuccess, currentShop, isError, isLoading }
}
