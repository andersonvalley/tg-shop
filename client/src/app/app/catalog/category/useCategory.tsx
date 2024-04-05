import { useQuery } from '@tanstack/react-query'
import { useShopStore } from '../../../../store/shop.state'
import { useCategoryStore } from '../../../../store/category.store'
import { useEffect } from 'react'
import { CategoryService } from '@/src/services/category/category.service'
import { QUERY_KEY } from '@/src/constants/queryKey'

export const useCategory = () => {
  const { id } = useShopStore(store => store.currentShop)
  const { saveCategories } = useCategoryStore(store => store)

  const {
    data: categories,
    isError: errorCategories,
    isLoading: isLoadingCategories,
    isSuccess,
  } = useQuery({
    queryKey: [QUERY_KEY.getAllCategories, id],
    queryFn: () => CategoryService.getAll(id),
  })

  useEffect(() => {
    if (isSuccess && categories) {
      saveCategories(categories)
    }
  }, [categories, isSuccess, saveCategories])

  return { categories, saveCategories, isLoadingCategories, errorCategories }
}
