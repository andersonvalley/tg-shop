import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { useShopStore } from '@/src/store/shop.state'
import { ShopService } from '@/src/services/shop/shop.service'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { PATHS } from '@/src/constants/pages-url.config'

export const useShop = () => {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const add = searchParams.get('add')
  const { saveShops, saveCurrentShop, currentShop } = useShopStore(store => store)
  const { data, isSuccess } = useQuery({ queryKey: [QUERY_KEY.getAllShops], queryFn: ShopService.getAll })

  useEffect(() => {
    if (isSuccess && data.length) {
      saveShops(data)
      saveCurrentShop(data[0])
    }
  }, [data, isSuccess, saveShops, saveCurrentShop])

  useEffect(() => {
    if (pathname === PATHS.START && data && data?.length > 0 && !add) {
      router.push(PATHS.CATALOG, { scroll: false })
    } else if (data && data?.length === 0) {
      router.push(PATHS.START, { scroll: false })
    }
  }, [pathname, data, router, add])

  return { data, isSuccess, currentShop }
}
