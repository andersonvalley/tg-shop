import { create } from 'zustand'
import { mountStoreDevtool } from 'simple-zustand-devtools'
import { IShop } from '../service/shop/shop.interface'

type ShopState = {
  shops: IShop[]
  currentShop: IShop
  saveShops: (shop: IShop[]) => void
  saveCurrentShop: (shop: IShop) => void
}

export const useShopStore = create<ShopState>(set => ({
  shops: [],
  currentShop: {
    botId: '',
    createdDate: '',
    firstName: '',
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
}))

mountStoreDevtool('shop', useShopStore)
