import { useMutation, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '../../../../constants/constants'
import { ICategory } from '../../../../service/category/category.interface'
import { CategoryService } from '../../../../service/category/category.service'

export const useDeleteCategory = () => {
  const client = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (id: string) => CategoryService.delete(id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.getAllCategories] })
    },
  })

  const deleteCategoryHandler = (value: ICategory) => {
    mutate(value.id)
  }

  return { deleteCategoryHandler }
}
