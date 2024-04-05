import { QUERY_KEY } from '@/src/constants/queryKey'
import { CategoryService } from '@/src/services/category/category.service'
import { ICategory } from '@/src/types/category.interface'
import { useMutation, useQueryClient } from '@tanstack/react-query'

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
