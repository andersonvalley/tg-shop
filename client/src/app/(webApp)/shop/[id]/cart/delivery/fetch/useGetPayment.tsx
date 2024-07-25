import { QUERY_KEY } from '@/src/constants/queryKey'
import { DeliveryService } from '@/src/services/delivery/delivery.service'
import { PaymentService } from '@/src/services/payment/payment.service'
import { useQuery } from '@tanstack/react-query'

export const useGetPaymentCart = (id: string) => {
  const { data: payment, isLoading } = useQuery({
    queryKey: [QUERY_KEY.getAllPayment],
    queryFn: () => PaymentService.getAll(id),
  })

  return { payment, isLoading }
}
