export interface IUpdateShopRequest {
  username?: string
  firstName?: string
  isActive?: boolean
  titleButton?: string
  shopId?: string
  description?: string
  afterOrder?: string
  firstLaunch?: string
  greetings?: string
}

export interface IShop {
  botId: string
  createdDate: string
  firstName: string
  description: string
  afterOrder: string
  firstLaunch: string
  greetings: string
  id: string
  isActive: boolean
  titleButton: string
  token: string
  updatedDate: string
  username: string
  webLink: string
}

export interface IToken {
  token: string
}
