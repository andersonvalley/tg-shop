import { QUERY_KEY } from '@/src/constants/queryKey'
import { useModalStore } from '@/src/store/modal.store'
import { IDelivery } from '@/src/types/delivery.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { emptyState } from '../payment'
import { IPayment } from '@/src/types/payment.interface'
import { PaymentService } from '@/src/services/payment/payment.service'

export const useDelete = () => {
  const [currentItem, setCurrentItem] = useState<IPayment>(emptyState)

  const client = useQueryClient()
  const { setIsConfirmDeleteModal } = useModalStore(store => store)

  const { mutate } = useMutation({
    mutationFn: (id: string) => PaymentService.delete(id),
    onSuccess: () => client.invalidateQueries({ queryKey: [QUERY_KEY.getAllPayment] }),
  })

  const deleteHandler = (id: string) => {
    mutate(id)
    setIsConfirmDeleteModal()
  }

  const deleteOption = (item: IPayment) => {
    setCurrentItem(item)
    setIsConfirmDeleteModal()
  }

  const isOkDelete = () => {
    if (!currentItem?.id) return
    deleteHandler(currentItem?.id)
  }

  return { deleteHandler, deleteOption, isOkDelete }
}
