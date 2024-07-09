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
import { useGetCart } from '../../hooks/useGetCart'
import { useCart } from '../../store/useCart'
import { usePathname } from '../../hooks/usePath'
import Link from 'next/link'

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
  const { setCart } = useCart()

  useEffect(() => {
    !isExpanded && expand()
  }, [expand, isExpanded])

  const { cart } = useGetCart()
  const { hash, initialPathname } = usePathname()

  useEffect(() => {
    if (!cart) return
    setCart(cart)
  }, [cart, setCart])

  return (
    <>
      <Search />
      <Categories categories={categories} />
      <ProductList isLoading={isLoading} products={products} categories={categories} />

      {cart && cart?.length > 0 && (
        <Link href={`${initialPathname}/cart/${hash}`}>
          <MainButton text="В корзине что-то есть" />{' '}
        </Link>
      )}
    </>
  )
}
