import { FormEvent } from 'react'
import { updateCategory } from '../../../../service/category/category.interface'
import { useCategoryUiStore } from '../../../../store/useCategoryUi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '../../../../constants/constants'
import { CategoryService } from '../../../../service/category/category.service'

export const useRenameCategory = () => {
  const { setToogleRenameModal, currentCategoryId, currentCategoryOrder, currentCategoryTitle } =
    useCategoryUiStore(store => store)

  const client = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (formData: updateCategory) => CategoryService.update(formData),
    onSuccess: () => {
      setToogleRenameModal()
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllCategories] })
    },
  })

  const renameCategoryHandler = () => {
    setToogleRenameModal()
  }

  const renameCategorySubmit = (e: FormEvent) => {
    e.preventDefault()
    mutate({ title: currentCategoryTitle, order: currentCategoryOrder, id: currentCategoryId })
  }

  return { renameCategoryHandler, renameCategorySubmit }
}
