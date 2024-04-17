export interface createOrUpdateCategory {
  title: string
  shopId?: string
  id?: string
}

export interface categoryResponse {
  message: string
}

export interface ICategory {
  title: string
  id: string
}
