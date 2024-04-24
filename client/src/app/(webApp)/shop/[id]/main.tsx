'use client'

import { useGet } from '@/src/hooks/requests/useGet'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { GoodsService } from '@/src/services/goods/goods.service'
import { Search } from '../../components/search/search'
import { MainButton, useExpand } from '@vkruglikov/react-telegram-web-app'
import { useEffect } from 'react'
import { CategoryService } from '@/src/services/category/category.service'
import { Categories } from '../../components/categories/categories'
import { ProductList } from '../../components/products/productList'
import { useSearchAndSortStore } from '../../store/searchAndSort'
import useDebounce from '@/src/hooks/useDebounce'

export const Main = ({ id }: { id: string }) => {
  const [isExpanded, expand] = useExpand()
  const { search, category, sortBy, sortByType } = useSearchAndSortStore()
  const debouncedSearch = useDebounce(search, 300)

  const { data: products, isLoading } = useGet(
    `${QUERY_KEY.getAllGoods}, ${debouncedSearch}, ${category}, ${sortBy}, ${sortByType}`,
    GoodsService.getAll,
    id,
    debouncedSearch,
    category,
    sortBy,
    sortByType
  )
  const { data: categories } = useGet(QUERY_KEY.getAllCategories, CategoryService.getAll, id)

  useEffect(() => {
    !isExpanded && expand()
  }, [expand, isExpanded])

  return (
    <>
      <Search />
      <Categories categories={categories} />
      <ProductList isLoading={isLoading} products={products} categories={categories} />

      <MainButton text="В корзине что-то есть" onClick={() => console.log('Hello, I am button!')} />
    </>
  )
}
