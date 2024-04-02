import { useState } from 'react'
import { ICategory, updateCategory } from '../../../../service/category/category.interface'
import { CategoryService } from '../../../../service/category/category.service'
import { useMutation } from '@tanstack/react-query'

interface Props {
  categories: ICategory[] | undefined
  saveCategories: (cat: ICategory[]) => void
}

export const useDragCategory = ({ saveCategories, categories }: Props) => {
  const [activeCategory, setActiveCategory] = useState(0)

  const { mutate } = useMutation({
    mutationFn: (formData: updateCategory) => CategoryService.update(formData),
  })

  const clickHandler = (index: number | undefined) => {
    if (index === undefined) return
    setActiveCategory(index)
  }

  const changeCategory = (oldIndex: number, newIndex: number) => {
    if (!categories) return

    const copy = categories.slice()
    const movedCategory = copy.splice(oldIndex, 1)[0]
    copy.splice(newIndex, 0, movedCategory)

    copy.forEach((category, index) => {
      category.order = index
    })

    saveCategories(copy)
    setActiveCategory(newIndex)

    copy.forEach(item => {
      mutate({ title: item.title, order: item.order, id: item.id })
    })
  }

  return { clickHandler, changeCategory, activeCategory }
}
