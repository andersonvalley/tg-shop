'use client'

import { useGet } from '@/src/hooks/requests/useGet'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { GoodsService } from '@/src/services/goods/goods.service'
import { Search } from '../../components/search/search'
import { useExpand } from '@vkruglikov/react-telegram-web-app'
import { useEffect } from 'react'
import { CategoryService } from '@/src/services/category/category.service'
import { Categories } from '../../components/categories/categories'
import { ProductList } from '../../components/products/productList'

export const Main = ({ id }: { id: string }) => {
  const [isExpanded, expand] = useExpand()
  const { data: products } = useGet(QUERY_KEY.getAllGoods, GoodsService.getAll, id)
  const { data: categories } = useGet(QUERY_KEY.getAllCategories, CategoryService.getAll, id)

  useEffect(() => {
    !isExpanded && expand()
  }, [expand, isExpanded])

  return (
    <>
      <Search />
      <Categories categories={categories} />
      <ProductList products={products} />
    </>
  )
}
