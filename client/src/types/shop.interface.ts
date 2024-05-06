export interface IUpdateShopRequest {
  username?: string
  first_name?: string
  is_active?: boolean
  title_button?: string
  shopId: string
  description?: string
  after_order?: string
  first_launch?: string
  greetings?: string
}

export interface IShop {
  bot_id: string
  created_date: string
  first_name: string
  description: string
  after_order: string
  first_launch: string
  greetings: string
  id: string
  is_active: boolean
  title_button: string
  token: string
  updated_date: string
  username: string
}

export interface IToken {
  token: string
}
