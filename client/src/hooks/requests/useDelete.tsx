import { useModalStore } from '@/src/store/modal.store'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { message } from 'antd'

export const useDelete = <T,>(queryKey: string, queryFn: (id: string) => Promise<T>) => {
  const [currentItem, setCurrentItem] = useState('')
  const { setIsConfirmDeleteModal, setIsOpenDropdown } = useModalStore(store => store)

  const client = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (id: string) => queryFn(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [queryKey] })
      message.success('Успешно')
    },
    onError: () => message.error('Ошибка'),
  })

  const deleteOk = (id: string) => {
    mutate(id)
    setIsConfirmDeleteModal()
  }

  const showConfirmDeleteModal = (id: string) => {
    setCurrentItem(id)
    setIsConfirmDeleteModal()
  }

  const deleteHandler = () => {
    if (!currentItem) return

    deleteOk(currentItem)
  }

  return { showConfirmDeleteModal, deleteHandler }
}
