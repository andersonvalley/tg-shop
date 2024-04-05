import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { useShopStore } from '../../../../store/shop.state'
import { AxiosError } from 'axios'
import { useCategoryStore } from '../../../../store/category.store'
import { CategoryService } from '@/src/services/category/category.service'
import { createCategory } from '@/src/types/category.interface'
import { QUERY_KEY } from '@/src/constants/queryKey'
import { IUserResponseError } from '@/src/types/auth.interface'

interface Props {
  setOpenModalToAddCategory: Dispatch<SetStateAction<boolean>>
}

export const useCreteCategory = ({ setOpenModalToAddCategory }: Props) => {
  const [value, setValue] = useState('')
  const { id } = useShopStore(store => store.currentShop)
  const { categories } = useCategoryStore(store => store)

  const client = useQueryClient()

  const { mutate, error } = useMutation({
    mutationFn: (formData: createCategory) => CategoryService.create(formData),
    onSuccess: () => {
      setValue('')
      setOpenModalToAddCategory(false)
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllCategories] })
    },
    onError: (error: AxiosError<IUserResponseError>) => console.log(error.response?.data),
  })

  const addCategoryHandler = (e: FormEvent) => {
    e.preventDefault()

    const formData = { title: value, order: (categories.length += 1), shopId: id }
    mutate(formData)
  }

  return { addCategoryHandler, error, setValue, value }
}
