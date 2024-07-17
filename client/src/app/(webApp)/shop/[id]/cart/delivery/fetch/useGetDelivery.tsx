import { QUERY_KEY } from '@/src/constants/queryKey'
import { DeliveryService } from '@/src/services/delivery/delivery.service'
import { useQuery } from '@tanstack/react-query'

export const useGetDeliveryCart = (id: string) => {
  const { data: delivery, isLoading } = useQuery({
    queryKey: [QUERY_KEY.getAllDelivery],
    queryFn: () => DeliveryService.getAll(id),
  })

  return { delivery, isLoading }
}
