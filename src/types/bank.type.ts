export interface IBank {
  _id: string
  accountNumber: string
  BIN: 970454
  accountName: string
  accountType: string
  balance: string
  bankCodeName: string
  bankName: string
  beginningBalance: number
  beginningSettingDate: string
  beginningTxnDate: string
  citad: string
  connectStatus: number
  createdAt: string
  createdBy: {
    _id: string
    name: string
    email: string
    role: string
  }
  creditTxnAmount: number
  creditTxnTotal: number
  currency: string
  debitTxnAmount: number
  debitTxnTotal: number
  endingBalance: number
  endingTxnDate: string
  id: number
  lockSyncDate: any
  memo: string
  serviceType: string
  swift: string
  updatedAt: string
}

export interface IResponseListBank {
  statusCode: number
  message: string
  data: {
    meta: {
      page: number
      limit: number
      totalPages: number
      totalItems: number
    }
    result: IBank[]
  }
}

export interface IResponseDetailBank {
  statusCode: number
  message: string
  data: IBank
}

export interface IResponseSynchronizeAccountBanks {
  message: string
  statusCode: number
}