import { QUERY_KEY } from '@/src/constants/queryKey'
import { DeliveryService } from '@/src/services/delivery/delivery.service'
import { useModalStore } from '@/src/store/modal.store'
import { IDelivery } from '@/src/types/delivery.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { emptyState } from '../delivery'

export const useDelete = () => {
  const [currentItem, setCurrentItem] = useState<IDelivery>(emptyState)

  const client = useQueryClient()
  const { setIsConfirmDeleteModal } = useModalStore(store => store)

  const { mutate: deleteDelivery } = useMutation({
    mutationFn: (id: string) => DeliveryService.delete(id),
    onSuccess: () => client.invalidateQueries({ queryKey: [QUERY_KEY.getAllDelivery] }),
  })

  const deleteDeliveryHandler = (id: string) => {
    deleteDelivery(id)
    setIsConfirmDeleteModal()
  }

  const deleteOption = (item: IDelivery) => {
    setCurrentItem(item)
    setIsConfirmDeleteModal()
  }

  const isOkDelete = () => {
    if (!currentItem?.id) return
    deleteDeliveryHandler(currentItem?.id)
  }

  return { deleteDeliveryHandler, deleteOption, isOkDelete }
}
