import { QUERY_KEY } from '@/src/constants/queryKey'
import { DeliveryService } from '@/src/services/delivery/delivery.service'
import { ShareService } from '@/src/services/share/share.service'
import { useModalStore } from '@/src/store/modal.store'
import { useShopStore } from '@/src/store/shop.state'
import { createShare } from '@/src/types/share.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

export const useCreate = () => {
  const { id } = useShopStore(store => store.currentShop)
  const { setToogleModal } = useModalStore(store => store)
  const client = useQueryClient()

  const { mutate: createDelivery } = useMutation({
    mutationFn: (formData: createShare) => ShareService.create(formData),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllShare] })
      message.success('Рассылка запущена')
    },
    onError: () => message.error('Произошла ошибка'),
  })

  const createShareHandler = (e: React.FormEvent<HTMLFormElement>, formData: createShare) => {
    formData.shopId = id
    createDelivery(formData)
    setToogleModal()
  }

  return { createShareHandler }
}
