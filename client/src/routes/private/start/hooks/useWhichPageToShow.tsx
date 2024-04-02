import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useShopStore } from '../../../../store/shop.state'
import { ShopService } from '../../../../service/shop/shop.service'
import { QUERY_KEY } from '../../../../constants/constants'

export const useWhichPageToShow = () => {
  const { saveShops, saveCurrentShop, currentShop } = useShopStore(store => store)
  const { data, isSuccess } = useQuery({ queryKey: [QUERY_KEY.getAllShops], queryFn: ShopService.getAll })

  useEffect(() => {
    if (isSuccess && data.length) {
      saveShops(data)
      saveCurrentShop(data[0])
    }
  }, [data, isSuccess, saveShops, saveCurrentShop])

  return { data, isSuccess, currentShop }
}
