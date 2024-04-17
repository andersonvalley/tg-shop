import { useModalStore } from '@/src/store/modal.store'
import { useShopStore } from '@/src/store/shop.state'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

export const useCreate = <T, T2 extends { shopId?: string }>(
  queryKey: string,
  queryFn: (formData: T2) => Promise<T>
) => {
  const { id } = useShopStore(store => store.currentShop)
  const { setToogleModal } = useModalStore(store => store)
  const client = useQueryClient()

  const { mutate: create } = useMutation({
    mutationFn: (formData: T2) => queryFn(formData),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [queryKey] })
      message.success('Успешно')
    },
    onError: () => message.error('Произошла ошибка'),
  })

  const createHandler = (formData: T2) => {
    formData.shopId = id
    create(formData)
    setToogleModal()
  }

  return { createHandler }
}
