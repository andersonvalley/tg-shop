import { QUERY_KEY } from '@/src/constants/queryKey'
import { useModalStore } from '@/src/store/modal.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { emptyState } from '../promocode'
import { IPromocode } from '@/src/types/promocode.interface'
import { PromocodeService } from '@/src/services/promocode/promocode.service'
import { message } from 'antd'

export const useUpdate = () => {
  const { setIsEditModal } = useModalStore(store => store)
  const [currentEditItem, setCurrentItem] = useState<IPromocode>(emptyState)
  const client = useQueryClient()
  const { hideEditModal, setIsOpenDropdown } = useModalStore(store => store)

  const { mutate: updateDelivery } = useMutation({
    mutationFn: (formData: IPromocode) => PromocodeService.update(formData),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllPromocode] })
      message.success('Успешно')
    },
  })

  const updateDeliveryHandler = (formData: IPromocode) => {
    updateDelivery(formData)
    hideEditModal()
  }

  const editOption = (item: IPromocode) => {
    setCurrentItem(item)
    setIsEditModal()
    setIsOpenDropdown()
  }

  return { updateDeliveryHandler, currentEditItem, editOption }
}
