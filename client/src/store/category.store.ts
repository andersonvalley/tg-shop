import { create } from 'zustand'
import { ICategory } from '../types/category.interface'
import { mountStoreDevtool } from 'simple-zustand-devtools'

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

mountStoreDevtool('shop', useCategoryStore)
