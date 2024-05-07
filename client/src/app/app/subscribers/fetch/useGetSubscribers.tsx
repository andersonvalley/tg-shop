import { QUERY_KEY } from '@/src/constants/queryKey'
import { useShopStore } from '@/src/store/shop.state'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useMemo, useState } from 'react'
import { ISubscriber } from '@/src/types/subscribers.interface'
import { SubscriberService } from '@/src/services/subscriber/subscriber.service'
import { normalizeOnlyDate } from '@/src/utils/normalizeDate'

export const useGetSubscribers = () => {
  const [items, setItems] = useState<ISubscriber[]>([])
  const { id } = useShopStore(store => store.currentShop)

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.getAllSubscribers, id],
    queryFn: () => SubscriberService.getAll(id),
  })

  useEffect(() => {
    if (isSuccess) {
      const items = data.map(item => ({ ...item, key: item.id }))
      setItems(items)
    }
  }, [data, isSuccess])

  return { items, setItems, isError, isLoading }
}
