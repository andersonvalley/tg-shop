import { create } from 'zustand'
import { IShop } from '../types/shop.interface'

type ShopState = {
  shops: IShop[]
  currentShop: IShop
  saveShops: (shop: IShop[]) => void
  saveCurrentShop: (shop: IShop) => void
  deleteAll: () => void
}

export const useShopStore = create<ShopState>(set => ({
  shops: [],
  currentShop: {
    bot_id: '',
    created_date: '',
    first_name: '',
    description: '',
    greetings: '',
    first_launch: '',
    after_order: '',
    id: '',
    is_active: false,
    title_button: '',
    token: '',
    updated_date: '',
    username: '',
  },
  saveShops: shops =>
    set(() => ({
      shops: [...shops],
    })),
  saveCurrentShop: shop => {
    set(() => ({
      currentShop: shop,
    }))
  },
  deleteAll: () =>
    set(() => ({
      shops: [],
      currentShop: {
        bot_id: '',
        created_date: '',
        first_name: '',
        description: '',
        greetings: '',
        first_launch: '',
        after_order: '',
        id: '',
        is_active: false,
        title_button: '',
        token: '',
        updated_date: '',
        username: '',
      },
    })),
}))

// mountStoreDevtool('shop', useShopStore)
