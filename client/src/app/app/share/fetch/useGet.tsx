import { QUERY_KEY } from '@/src/constants/queryKey'
import { useShopStore } from '@/src/store/shop.state'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { IShare } from '@/src/types/share.interface'
import { ShareService } from '@/src/services/share/share.service'

export const useGet = () => {
  const [items, setItems] = useState<IShare[]>([])
  const { id } = useShopStore(store => store.currentShop)

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.getAllShare, id],
    queryFn: () => ShareService.getAll(id),
  })

  useEffect(() => {
    if (isSuccess) {
      setItems(data)
    }
  }, [data, isSuccess])

  return { items, setItems, isError, isLoading }
}
