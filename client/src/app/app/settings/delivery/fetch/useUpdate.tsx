import { QUERY_KEY } from '@/src/constants/queryKey'
import { DeliveryService } from '@/src/services/delivery/delivery.service'
import { useModalStore } from '@/src/store/modal.store'
import { useShopStore } from '@/src/store/shop.state'
import { IDelivery } from '@/src/types/delivery.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormEvent, useState } from 'react'
import { emptyState } from '../delivery'

export const useUpdate = () => {
  const { setIsEditModal } = useModalStore(store => store)
  const [currentEditItem, setCurrentItem] = useState<IDelivery>(emptyState)
  const client = useQueryClient()
  const { hideEditModal, setIsOpenDropdown } = useModalStore(store => store)

  const { mutate: updateDelivery } = useMutation({
    mutationFn: (formData: IDelivery) => DeliveryService.update(formData),
    onSuccess: () => client.invalidateQueries({ queryKey: [QUERY_KEY.getAllDelivery] }),
  })

  const updateDeliveryHandler = (formData: IDelivery) => {
    updateDelivery(formData)
    hideEditModal()
  }

  const editOption = (item: IDelivery) => {
    setCurrentItem(item)
    setIsEditModal()
    setIsOpenDropdown()
  }

  return { updateDeliveryHandler, currentEditItem, editOption }
}
