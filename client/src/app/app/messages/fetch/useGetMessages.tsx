import { QUERY_KEY } from '@/src/constants/queryKey'
import { useShopStore } from '@/src/store/shop.state'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { MessagesService } from '@/src/services/messages/messages.service'
import { iMessage } from '@/src/types/messages.interface'
import { useParams } from 'next/navigation'

export const useGetMessages = () => {
  const [items, setItems] = useState<iMessage[]>([])
  const { id } = useParams()

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.getAllMessages],
    queryFn: () => MessagesService.getById(String(id)),
    refetchOnWindowFocus: true,
    refetchInterval: 5000,
  })

  useEffect(() => {
    if (isSuccess) {
      setItems(data)
    }
  }, [data, isSuccess])

  return { items, setItems, isError, isLoading, isSuccess }
}
