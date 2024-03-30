export interface IUpdateShopRequest {
  username?: string
  firstName?: string
  isActive?: boolean
  titleButton?: string
}

export interface IShop {
  botId: string
  createdDate: string
  firstName: string
  id: string
  isActive: boolean
  titleButton: string
  token: string
  updatedDate: string
  username: string
  webLink: string
}
