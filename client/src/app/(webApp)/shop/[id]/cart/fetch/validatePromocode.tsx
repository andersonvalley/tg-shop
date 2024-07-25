import { PromocodeService } from '@/src/services/promocode/promocode.service'
import { promocodeResponse, validatePromocode } from '@/src/types/promocode.interface'
import { useMutation } from '@tanstack/react-query'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app'

export const useValidatePromocode = () => {
  const [impactOccurred, notificationOccurred] = useHapticFeedback()

  const { mutate: validate } = useMutation({
    mutationFn: (data: validatePromocode) => PromocodeService.validate(data),
    onSuccess: () => {
      message.success('Применен успешно')
      notificationOccurred('success')
    },
    onError: (e: AxiosError<promocodeResponse>) => {
      impactOccurred('heavy')
      message.error(e.response?.data.message)
    },
  })

  return { validate }
}
