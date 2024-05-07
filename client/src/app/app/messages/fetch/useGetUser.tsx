import { QUERY_KEY } from '@/src/constants/queryKey'
import { useShopStore } from '@/src/store/shop.state'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { MessagesService } from '@/src/services/messages/messages.service'
import { iMessagesByUser } from '@/src/types/messages.interface'

export const useGetUsersMessage = () => {
  const [items, setItems] = useState<iMessagesByUser[]>([])
  const { id } = useShopStore(store => store.currentShop)

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.getAllUsersMessage],
    queryFn: () => MessagesService.getAll(id),
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
  })

  useEffect(() => {
    if (isSuccess) {
      setItems(data)
    }
  }, [data, isSuccess])

  return { items, setItems, isError, isLoading }
}
