import { QUERY_KEY } from '@/src/constants/queryKey'
import { useModalStore } from '@/src/store/modal.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { emptyState } from '../promocode'
import { IPromocode } from '@/src/types/promocode.interface'
import { PromocodeService } from '@/src/services/promocode/promocode.service'
import { message } from 'antd'

export const useDelete = () => {
  const [currentItem, setCurrentItem] = useState<IPromocode>(emptyState)

  const client = useQueryClient()
  const { setIsConfirmDeleteModal } = useModalStore(store => store)

  const { mutate: deleteDelivery } = useMutation({
    mutationFn: (id: string) => PromocodeService.delete(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllPromocode] })
      message.success('Успешно')
    },
  })

  const deleteDeliveryHandler = (id: string) => {
    deleteDelivery(id)
    setIsConfirmDeleteModal()
  }

  const deleteOption = (item: IPromocode) => {
    setCurrentItem(item)
    setIsConfirmDeleteModal()
  }

  const isOkDelete = () => {
    if (!currentItem?.id) return
    deleteDeliveryHandler(currentItem?.id)
  }

  return { deleteDeliveryHandler, deleteOption, isOkDelete }
}
