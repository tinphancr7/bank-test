export interface IUser {
  _id: string
  name: string
  email: string
  password: string
  role: {
    _id: string
    name: string
    description: string
    isActive: boolean
    permissions: any
    createdBy: string
    createdAt: string
    updatedAt: string
    __v: 0
  }
  createdAt: string
  updatedAt: string
  refresh_token: string
}

export interface IResponseListUsers {
  statusCode: number
  message: string
  data: {
    meta: {
      page: number
      limit: number
      totalPages: number
      totalItems: number
    }
    result: IUser[]
  }
}
