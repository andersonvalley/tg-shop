import { QUERY_KEY } from '@/src/constants/queryKey'
import { PromocodeService } from '@/src/services/promocode/promocode.service'
import { useModalStore } from '@/src/store/modal.store'
import { useShopStore } from '@/src/store/shop.state'
import { IPromocode } from '@/src/types/promocode.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

export const useCreate = () => {
  const { id } = useShopStore(store => store.currentShop)
  const { setToogleModal } = useModalStore(store => store)
  const client = useQueryClient()

  const { mutate: createDelivery } = useMutation({
    mutationFn: (formData: IPromocode) => PromocodeService.create(formData),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllPromocode] })
      message.success('Успешно')
    },
    onError: () => message.error('Произошла ошибка'),
  })

  const createDeliveryHandler = (formData: IPromocode) => {
    formData.shopId = id
    createDelivery(formData)
    setToogleModal()
  }

  return { createDeliveryHandler }
}
