import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useShopStore } from '../store/shop.state'
import { ShopService } from '../service/shop/shop.service'
import { APP_PATH } from '../routes/config/Paths'
import { QUERY_KEY } from '../constants/constants'

export const useShopAndNavigate = () => {
  const { saveShops, saveCurrentShop } = useShopStore(store => store)
  const { data, isSuccess } = useQuery({ queryKey: [QUERY_KEY.getAllShops], queryFn: ShopService.getAll })
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess && data.length) {
      saveShops(data)
      saveCurrentShop(data[0])
      navigate(APP_PATH.CATALOG)
    } else {
      navigate(APP_PATH.START)
    }
  }, [data, isSuccess, saveShops, saveCurrentShop])
}
