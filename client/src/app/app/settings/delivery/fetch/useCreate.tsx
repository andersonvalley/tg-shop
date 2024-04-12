import { QUERY_KEY } from '@/src/constants/queryKey'
import { DeliveryService } from '@/src/services/delivery/delivery.service'
import { useModalStore } from '@/src/store/modal.store'
import { useShopStore } from '@/src/store/shop.state'
import { IDelivery } from '@/src/types/delivery.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

export const useCreate = () => {
  const { id } = useShopStore(store => store.currentShop)
  const { setToogleModal } = useModalStore(store => store)
  const client = useQueryClient()

  const { mutate: createDelivery } = useMutation({
    mutationFn: (formData: IDelivery) => DeliveryService.create(formData),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllDelivery] })
      message.success('Успешно')
    },
    onError: () => message.error('Произошла ошибка'),
  })

  const createDeliveryHandler = (formData: IDelivery) => {
    formData.shopId = id
    createDelivery(formData)
    setToogleModal()
  }

  return { createDeliveryHandler }
}
