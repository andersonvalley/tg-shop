// import { useQuery } from '@tanstack/react-query'
// import { useShopStore } from '../../../../store/shop.state'
// import { useEffect } from 'react'
// import { useGoodsStore } from '../../../../store/goods.store'
// import { QUERY_KEY } from '@/src/constants/queryKey'
// import { GoodsService } from '@/src/services/goods/goods.service'

// export const useGoods = () => {
//   const { id } = useShopStore(store => store.currentShop)
//   const { saveGoods } = useGoodsStore(store => store)

//   const {
//     data: goods,
//     isError: errorGoods,
//     isLoading: isLoadingGoods,
//     isSuccess,
//     refetch,
//   } = useQuery({
//     queryKey: [QUERY_KEY.getAllGoods, id],
//     queryFn: () => GoodsService.getAll(id),
//   })

//   useEffect(() => {
//     if (isSuccess && goods) {
//       saveGoods(goods)
//     }
//   }, [goods, isSuccess, saveGoods])

//   useEffect(() => {
//     refetch()
//   }, [id, refetch])

//   return { goods, isLoadingGoods, errorGoods }
// }
