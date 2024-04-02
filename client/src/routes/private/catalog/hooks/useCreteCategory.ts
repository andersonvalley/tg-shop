import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { CategoryService } from '../../../../service/category/category.service'
import { createCategory } from '../../../../service/category/category.interface'
import { useShopStore } from '../../../../store/shop.state'
import { IUserResponseError } from '../../../../service/auth/Auth.interface'
import { AxiosError } from 'axios'
import { QUERY_KEY } from '../../../../constants/constants'
import { useCategoryStore } from '../../../../store/category.store'

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
