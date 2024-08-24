export interface ITransaction {
  _id: string
  accountId: number
  privateId: number
  reference: string
  amount: number
  bankCodeName: string
  bookingDate: any
  counterAccountBankId: string
  counterAccountBankName: string
  counterAccountName: string
  counterAccountNumber: string
  createdAt: string
  description: string
  paymentChannel: string
  runningBalance: number
  transactionDate: string
  transactionDateTime: string
  updatedAt: string
  virtualAccountName: string
  virtualAccountNumber: string
}

export interface IResponseListTransactions {
  message: string
  statusCode: number
  data: {
    meta: {
      page: number
      limit: number
      totalPages: number
      totalItems: number
    }
    result: ITransaction[]
  }
}
