export interface createCategory {
  title: string
  order: number
  shopId: string
}

export interface updateCategory {
  title: string
  order: number
  id: string
}

export interface categoryResponse {
  message: string
}

export interface ICategory {
  title: string
  order: number
  id: string
}
