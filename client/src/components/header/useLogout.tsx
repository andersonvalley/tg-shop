import { PATHS } from '@/src/constants/pages-url.config'
import { removeTokenStorage } from '@/src/services/auth/auth.helpers'
import { AuthService } from '@/src/services/auth/auth.service'
import { useUserStore } from '@/src/store/user.state'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useLogout = () => {
  const router = useRouter()
  const { deleteAllUser } = useUserStore(store => store)

  const { mutate: fetchLogout } = useMutation({
    mutationFn: AuthService.logut,
    onSuccess: () => {
      deleteAllUser()
      removeTokenStorage()
      router.push(PATHS.LOGIN, { scroll: false })
    },
  })

  return { fetchLogout }
}
