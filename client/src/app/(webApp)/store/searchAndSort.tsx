import { create } from 'zustand'

type State = {
  search: string
  setSearch: (payload: string) => void
  category: string
  setCategory: (payload: string) => void
  sortBy: string
  setSortBy: (payload: string) => void
  sortByType: string
  setSortByType: (payload: string) => void
}

export const useSearchAndSortStore = create<State>(set => ({
  search: '',
  category: '',
  sortBy: '',
  setSearch: payload => {
    set({ search: payload })
  },
  setCategory: payload => {
    set({ category: payload, search: '' })
  },
  setSortBy: payload => {
    set({ sortBy: payload })
  },
  sortByType: '',
  setSortByType: payload => {
    set({ sortByType: payload })
  },
}))

// mountStoreDevtool('Store', useUiStore)
