import { useModalStore } from '@/src/store/modal.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { useState } from 'react'

export const useUpdate = <T, T2>(queryKey: string, queryFn: (formData: T2) => Promise<T>) => {
  const { setIsEditModal } = useModalStore(store => store)
  const { hideEditModal, setIsOpenDropdown } = useModalStore(store => store)
  const [currentEditItem, setCurrentItem] = useState<T2>()

  const client = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (formData: T2) => queryFn(formData),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [queryKey] })
      message.success('Успешно')
    },
    onError: () => message.error('Произошла ошибка'),
  })

  const updateHandler = (formData: T2) => {
    mutate(formData)
    hideEditModal()
  }

  const editOption = (item: T2) => {
    setCurrentItem(item)
    setIsEditModal()
    setIsOpenDropdown()
  }

  return { updateHandler, currentEditItem, editOption }
}
