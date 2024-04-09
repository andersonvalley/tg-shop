import { QUERY_KEY } from '@/src/constants/queryKey'
import { DeliveryService } from '@/src/services/delivery/delivery.service'
import { useShopStore } from '@/src/store/shop.state'
import { IDelivery } from '@/src/types/delivery.interface'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useUpdate } from './useUpdate'
import { IPromocode } from '@/src/types/promocode.interface'
import { PromocodeService } from '@/src/services/promocode/promocode.service'

export const useGet = () => {
  const [items, setItems] = useState<IPromocode[]>([])
  const { id } = useShopStore(store => store.currentShop)
  const { updateDeliveryHandler } = useUpdate()

  const { data, isError, isLoading, isSuccess } = useQuery({
    queryKey: [QUERY_KEY.getAllPromocode, id],
    queryFn: () => PromocodeService.getAll(id),
  })

  useEffect(() => {
    if (isSuccess) {
      setItems(data)
    }
  }, [data, isSuccess])

  const updateIsActive = (checked: boolean, item: IPromocode) => {
    const updated = items.map(current => {
      if (current.id === item.id) {
        return { ...current, isActive: checked }
      }
      return current
    })

    setItems(updated)
    const current = updated.find(el => el.id === item.id)
    if (current) updateDeliveryHandler(current)
  }

  return { items, setItems, isError, isLoading, updateIsActive }
}
