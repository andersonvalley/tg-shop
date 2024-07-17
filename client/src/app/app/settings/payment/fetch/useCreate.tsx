import { QUERY_KEY } from '@/src/constants/queryKey'
import { PaymentService } from '@/src/services/payment/payment.service'
import { useModalStore } from '@/src/store/modal.store'
import { useShopStore } from '@/src/store/shop.state'
import { IDelivery } from '@/src/types/delivery.interface'
import { IPayment } from '@/src/types/payment.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

export const useCreate = () => {
  const { id } = useShopStore(store => store.currentShop)
  const { setToogleModal } = useModalStore(store => store)
  const client = useQueryClient()

  const { mutate: createPayment } = useMutation({
    mutationFn: (formData: IPayment) => PaymentService.create(formData),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllPayment] })
      message.success('Успешно')
    },
    onError: () => message.error('Произошла ошибка'),
  })

  const createHandler = (formData: IPayment) => {
    formData.shopId = id
    createPayment(formData)
    setToogleModal()
  }

  return { createHandler }
}
