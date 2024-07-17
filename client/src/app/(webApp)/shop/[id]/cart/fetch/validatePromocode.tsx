import { PromocodeService } from '@/src/services/promocode/promocode.service'
import { promocodeResponse, validatePromocode } from '@/src/types/promocode.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { Axios, AxiosError } from 'axios'

export const useValidatePromocode = () => {
  const client = useQueryClient()

  const { mutate: validate } = useMutation({
    mutationFn: (data: validatePromocode) => PromocodeService.validate(data),
    onSuccess: () => {
      message.success('Применен успешно')
    },
    onError: (e: AxiosError<promocodeResponse>) => {
      message.error(e.response?.data.message)
    },
  })

  return { validate }
}
