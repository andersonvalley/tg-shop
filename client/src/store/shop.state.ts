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
    botId: '',
    createdDate: '',
    firstName: '',
    description: '',
    greetings: '',
    firstLaunch: '',
    afterOrder: '',
    id: '',
    isActive: false,
    titleButton: '',
    token: '',
    updatedDate: '',
    username: '',
    webLink: '',
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
        botId: '',
        createdDate: '',
        firstName: '',
        description: '',
        greetings: '',
        firstLaunch: '',
        afterOrder: '',
        id: '',
        isActive: false,
        titleButton: '',
        token: '',
        updatedDate: '',
        username: '',
        webLink: '',
      },
    })),
}))

// mountStoreDevtool('shop', useShopStore)
