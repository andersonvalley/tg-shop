import { useShopStore } from '@/src/store/shop.state'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'

interface UseGetResult<T> {
  data: T | undefined
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
}

export const useGet = <T,>(queryKey: string, queryFn: (id: string) => Promise<T>): UseGetResult<T> => {
  const { id } = useShopStore(store => store.currentShop)

  const { data, isError, isLoading, isSuccess }: QueryObserverResult<T, unknown> = useQuery({
    queryKey: [queryKey, id],
    queryFn: () => queryFn(id),
  })

  return { data, isError, isLoading, isSuccess }
}
