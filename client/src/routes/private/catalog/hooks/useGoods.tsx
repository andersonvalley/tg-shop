import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '../../../../constants/constants'
import { useShopStore } from '../../../../store/shop.state'
import { useEffect } from 'react'
import { GoodsService } from '../../../../service/goods/goods.service'
import { useGoodsStore } from '../../../../store/goods.store'

export const useGoods = () => {
  const { id } = useShopStore(store => store.currentShop)
  const { saveGoods } = useGoodsStore(store => store)

  const {
    data: goods,
    isError: errorGoods,
    isLoading: isLoadingGoods,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.getAllGoods],
    queryFn: () => GoodsService.getAll(id),
  })

  useEffect(() => {
    if (isSuccess && goods) {
      saveGoods(goods)
    }
  }, [goods, isSuccess, saveGoods])

  useEffect(() => {
    refetch()
  }, [id])

  return { goods, isLoadingGoods, errorGoods }
}
