import { useShopStore } from '@/src/store/shop.state'
import { QueryObserverResult, useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'

interface UseGetResult<T> {
  data: T | undefined
  isError: boolean
  isLoading: boolean
  isSuccess: boolean
}

export const useGet = <T,>(
  queryKey: string,
  queryFn: (id: string) => Promise<T>,
  pathname?: string
): UseGetResult<T> => {
  const { id } = useShopStore(store => store.currentShop)

  const currentId = pathname ? pathname : id

  const { data, isError, isLoading, isSuccess }: QueryObserverResult<T, unknown> = useQuery({
    queryKey: [queryKey, currentId],
    queryFn: () => queryFn(currentId),
  })

  return { data, isError, isLoading, isSuccess }
}
