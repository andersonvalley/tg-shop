import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '../../../../constants/constants'
import { CategoryService } from '../../../../service/category/category.service'
import { useShopStore } from '../../../../store/shop.state'
import { useCategoryStore } from '../../../../store/category.store'
import { useEffect } from 'react'

export const useCategory = () => {
  const { id } = useShopStore(store => store.currentShop)
  const { saveCategories } = useCategoryStore(store => store)

  const {
    data: categories,
    isError: errorCategories,
    isLoading: isLoadingCategories,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: [QUERY_KEY.getAllCategories],
    queryFn: () => CategoryService.getAll(id),
  })

  useEffect(() => {
    if (isSuccess && categories) {
      saveCategories(categories)
    }
  }, [categories, isSuccess, saveCategories])

  useEffect(() => {
    refetch()
  }, [id])

  return { categories, saveCategories, isLoadingCategories, errorCategories }
}
