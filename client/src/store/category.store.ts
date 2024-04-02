import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { ICategory } from '../service/category/category.interface'

type CategoryState = {
  categories: ICategory[]
  saveCategories: (category: ICategory[]) => void
}

export const useCategoryStore = create<CategoryState>(set => ({
  categories: [],
  saveCategories: categories =>
    set(() => ({
      categories,
    })),
}))

// mountStoreDevtool('shop', useCategoryStore)
