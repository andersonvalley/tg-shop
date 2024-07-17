import { QUERY_KEY } from '@/src/constants/queryKey'
import { DeliveryService } from '@/src/services/delivery/delivery.service'
import { useModalStore } from '@/src/store/modal.store'
import { IDelivery } from '@/src/types/delivery.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { emptyState } from '../payment'
import { IPayment } from '@/src/types/payment.interface'
import { PaymentService } from '@/src/services/payment/payment.service'

export const useUpdate = () => {
  const { setIsEditModal } = useModalStore(store => store)
  const [currentEditItem, setCurrentItem] = useState<IPayment>(emptyState)
  const client = useQueryClient()
  const { hideEditModal, setIsOpenDropdown } = useModalStore(store => store)

  const { mutate: update } = useMutation({
    mutationFn: (formData: IPayment) => PaymentService.update(formData),
    onSuccess: () => client.invalidateQueries({ queryKey: [QUERY_KEY.getAllPayment] }),
  })

  const updatePaymentHandler = (formData: IPayment) => {
    update(formData)
    hideEditModal()
  }

  const editOption = (item: IPayment) => {
    setCurrentItem(item)
    setIsEditModal()
    setIsOpenDropdown()
  }

  return { updatePaymentHandler, currentEditItem, editOption }
}
