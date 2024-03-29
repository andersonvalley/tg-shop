import { create } from 'zustand'

type State = {
  toogleMobileMenu: boolean
  setToogleMobileMenu: () => void
}

export const useUiStore = create<State>(set => ({
  toogleMobileMenu: false,
  setToogleMobileMenu: () =>
    set(state => ({
      toogleMobileMenu: !state.toogleMobileMenu,
    })),
}))

// mountStoreDevtool('Store', useUiStore)
