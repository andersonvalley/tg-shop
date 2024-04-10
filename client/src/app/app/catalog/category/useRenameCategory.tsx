// import { FormEvent } from 'react'
// import { useCategoryUiStore } from '../../../../store/useCategoryUi'
// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { CategoryService } from '@/src/services/category/category.service'
// import { updateCategory } from '@/src/types/category.interface'
// import { QUERY_KEY } from '@/src/constants/queryKey'

// export const useRenameCategory = () => {
//   const { setToogleRenameModal, currentCategoryId, currentCategoryOrder, currentCategoryTitle } =
//     useCategoryUiStore(store => store)

//   const client = useQueryClient()

//   const { mutate } = useMutation({
//     mutationFn: (formData: updateCategory) => CategoryService.update(formData),
//     onSuccess: () => {
//       setToogleRenameModal()
//       client.invalidateQueries({ queryKey: [QUERY_KEY.getAllCategories] })
//     },
//   })

//   const renameCategoryHandler = () => {
//     setToogleRenameModal()
//   }

//   const renameCategorySubmit = (e: FormEvent) => {
//     e.preventDefault()
//     mutate({ title: currentCategoryTitle, order: currentCategoryOrder, id: currentCategoryId })
//   }

//   return { renameCategoryHandler, renameCategorySubmit }
// }
