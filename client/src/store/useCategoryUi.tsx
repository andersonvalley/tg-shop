import { mountStoreDevtool } from 'simple-zustand-devtools'
import { create } from 'zustand'

type State = {
  openDropdown: boolean
  renameModal: boolean
  setToogleDropdown: (id: string, title: string, order: number) => void
  setToogleRenameModal: () => void
  currentCategoryId: string
  currentCategoryTitle: string
  currentCategoryOrder: number
  setCurrentCategoryTitle: (value: string) => void
}

export const useCategoryUiStore = create<State>(set => ({
  openDropdown: false,
  currentCategoryId: '',
  currentCategoryTitle: '',
  currentCategoryOrder: 0,
  renameModal: false,
  setCurrentCategoryTitle: value => set(() => ({ currentCategoryTitle: value })),
  setToogleDropdown: (id, title, order) =>
    set(state => ({
      currentCategoryId: id,
      currentCategoryTitle: title,
      currentCategoryOrder: order,
      openDropdown: !state.openDropdown,
    })),
  setToogleRenameModal: () =>
    set(state => ({
      openDropdown: false,
      renameModal: !state.renameModal,
    })),
}))

// mountStoreDevtool('cat', useCategoryUiStore)
