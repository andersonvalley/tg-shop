import { QUERY_KEY } from '@/src/constants/queryKey'
import { DeliveryService } from '@/src/services/delivery/delivery.service'
import { useQuery } from '@tanstack/react-query'

export const useGetPaymentCart = (id: string) => {
  const { data: payment, isLoading } = useQuery({
    queryKey: [QUERY_KEY.getAllDelivery],
    queryFn: () => DeliveryService.getAll(id),
  })

  return { payment, isLoading }
}
