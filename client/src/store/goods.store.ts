import { create } from 'zustand'
import { IGood } from '../types/goods.interface'

type GoodState = {
  goods: IGood[]
  saveGoods: (goods: IGood[]) => void
}

export const useGoodsStore = create<GoodState>(set => ({
  goods: [],
  saveGoods: () =>
    set(state => ({
      goods: state.goods,
    })),
}))

// mountStoreDevtool('shop', useGoodsStore)
