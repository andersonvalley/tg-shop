import { QUERY_KEY } from '@/src/constants/queryKey'
import { useShopStore } from '@/src/store/shop.state'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ISubscriber } from '@/src/types/subscribers.interface'
import { SubscriberService } from '@/src/services/subscriber/subscriber.service'

export const useGet = () => {
  const [items, setItems] = useState<ISubscriber[]>([])
  const { id } = useShopStore(store => store.currentShop)

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.getAllSubscribers, id],
    queryFn: () => SubscriberService.getAll(id),
  })

  useEffect(() => {
    if (isSuccess) {
      setItems(data)
    }
  }, [data, isSuccess])

  return { items, setItems, isError, isLoading }
}
