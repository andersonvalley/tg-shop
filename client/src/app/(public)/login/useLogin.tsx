import { PATHS } from '@/src/constants/pages-url.config'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { saveTokenStorage } from '@/src/services/auth/auth.helpers'
import { AuthService } from '@/src/services/auth/auth.service'
import { useShopStore } from '@/src/store/shop.state'
import { useUserStore } from '@/src/store/user.state'
import { ILoginRequest, IUserResponseError } from '@/src/types/auth.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useLogin = () => {
  const { saveUser } = useUserStore(store => store)
  const client = useQueryClient()
  const router = useRouter()

  const { mutate, isError, error } = useMutation({
    mutationFn: (code: ILoginRequest) => AuthService.login(code),
    onError: (error: AxiosError<IUserResponseError>) => console.log(error.response?.data.message),
    onSuccess: data => {
      saveUser(data)
      saveTokenStorage(data.accessToken)
      router.push(PATHS.CATALOG, { scroll: false })
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllShops] })
    },
  })

  return { mutate, isError, error }
}
