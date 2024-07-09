import { iCart } from '@/src/types/cart.interface'
import { create } from 'zustand'

type State = {
  cart: iCart[]
  setCart: (payload: iCart[]) => void
}

export const useCart = create<State>(set => ({
  cart: [],
  setCart: payload => {
    set({ cart: payload })
  },
}))

// mountStoreDevtool('Store', useUiStore)
