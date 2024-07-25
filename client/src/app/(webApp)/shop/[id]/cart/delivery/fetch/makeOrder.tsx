import { OrderService } from '@/src/services/order/order.service'
import { ICreateOrder, IOrderResponse } from '@/src/types/order.interface'
import { useMutation } from '@tanstack/react-query'
import { useHapticFeedback, useWebApp } from '@vkruglikov/react-telegram-web-app'
import { message } from 'antd'
import { AxiosError } from 'axios'

export const useCreateOrder = () => {
  const [impactOccurred, notificationOccurred] = useHapticFeedback()
  const WebApp = useWebApp()

  const { mutate: makeOrder } = useMutation({
    mutationFn: (data: ICreateOrder) => OrderService.create(data),
    onSuccess: () => {
      message.success('Заказ создан')
      notificationOccurred('success')
      WebApp.close()
    },
    onError: (e: AxiosError<IOrderResponse>) => {
      message.error(e.response?.data.message)
      impactOccurred('heavy')
    },
  })

  return { makeOrder }
}
