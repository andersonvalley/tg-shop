import { iCart } from '@/src/types/cart.interface'
import { create } from 'zustand'

type State = {
  cart: iCart[]
  promocodeId: string
  totalPrice: string
  setCart: (payload: iCart[]) => void
  setTotalPrice: (payload: string) => void
  setPromocodeId: (payload: string) => void
}

export const useCart = create<State>(set => ({
  cart: [],
  promocodeId: '',
  totalPrice: '',
  setCart: payload => {
    set({ cart: payload })
  },
  setTotalPrice: payload => {
    set({ totalPrice: payload })
  },
  setPromocodeId: payload => {
    set({ promocodeId: payload })
  },
}))
