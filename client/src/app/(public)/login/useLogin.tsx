import { PATHS } from '@/src/constants/pages-url.config'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { saveTokenStorage } from '@/src/services/auth/auth.helpers'
import { AuthService } from '@/src/services/auth/auth.service'
import { useUserStore } from '@/src/store/user.state'
import { ILoginRequest, IUserResponseError } from '@/src/types/auth.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { message } from 'antd'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'

export const useLogin = () => {
  const { saveUser } = useUserStore(store => store)
  const client = useQueryClient()
  const router = useRouter()

  const { mutate, isError, error } = useMutation({
    mutationFn: (code: ILoginRequest) => AuthService.login(code),
    onError: (error: AxiosError<IUserResponseError>) => message.error('Ошибка входа'),
    onSuccess: data => {
      message.success('Успешно')
      saveUser(data)
      saveTokenStorage(data.accessToken)
      router.push(PATHS.START, { scroll: false })
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllShops] })
    },
  })

  return { mutate, isError, error }
}
