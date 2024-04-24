import { QUERY_KEY } from '@/src/constants/queryKey'
import { CartService } from '@/src/services/cart/cart.service'
import { useQuery } from '@tanstack/react-query'
import { useInitData } from '@vkruglikov/react-telegram-web-app'

export const useGetCart = () => {
  const [initDataUnsafe] = useInitData()

  const { data: cart, isLoading } = useQuery({
    queryKey: [QUERY_KEY.getCart, initDataUnsafe?.user?.id],
    queryFn: () => CartService.getAll(String(initDataUnsafe?.user?.id)),
    enabled: !!initDataUnsafe?.user?.id,
  })

  return { cart, isLoading }
}
