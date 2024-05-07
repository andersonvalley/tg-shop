import { QUERY_KEY } from '@/src/constants/queryKey'
import { MessagesService } from '@/src/services/messages/messages.service'
import { iCreateMessage } from '@/src/types/messages.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'

export const useCreateMessage = () => {
  const client = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (formData: iCreateMessage) => MessagesService.create(formData),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllMessages] })
      message.success('Сообщение отправлено')
    },
    onError: () => message.error('Произошла ошибка'),
  })

  const createHandler = (formData: iCreateMessage) => {
    mutate(formData)
  }

  return { createHandler }
}
