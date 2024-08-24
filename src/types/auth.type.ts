export interface IUser {
  _id: number
  name: string
  email: string
  role: {
    id: number
    name: string
  }
}

export interface IPermissions {
  _id: string
  name: string
  apiPath: string
  method: string
  module: string
}

export interface IResLogin {
  message: string
  statusCode: string
  data: {
    user: IUser
    access_token: string
    permission: IPermissions[]
  }
}

export interface IFormLogin {
  email: string
  password: string
}
