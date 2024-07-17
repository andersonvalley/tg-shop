import { QUERY_KEY } from '@/src/constants/queryKey'
import { useShopStore } from '@/src/store/shop.state'
import { IDelivery } from '@/src/types/delivery.interface'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useUpdate } from './useUpdate'
import { IPayment } from '@/src/types/payment.interface'
import { PaymentService } from '@/src/services/payment/payment.service'

export const useGet = () => {
  const [items, setItems] = useState<IPayment[]>([])
  const { id } = useShopStore(store => store.currentShop)
  const { updatePaymentHandler } = useUpdate()

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.getAllPayment, id],
    queryFn: () => PaymentService.getAll(id),
  })

  useEffect(() => {
    if (isSuccess) {
      setItems(data)
    }
  }, [data, isSuccess])

  const updateIsActive = (checked: boolean, item: IPayment) => {
    const updated = items.map(current => {
      if (current.id === item.id) {
        return { ...current, isActive: checked }
      }
      return current
    })

    setItems(updated)
    const current = updated.find(el => el.id === item.id)
    if (current) updatePaymentHandler(current)
  }

  return { items, setItems, isError, isLoading, updateIsActive }
}
