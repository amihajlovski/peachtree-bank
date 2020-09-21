export interface ITransaction {
  amount: string;
  categoryCode: string;
  merchant: string;
  merchantLogo: string;
  transactionDate: number;
  transactionType: TransactionType;
}

export interface ITransactionResponse {
  data: ITransaction[];
}

export type TransactionType =
  | 'Online Transfer'
  | 'Card Payment'
  | 'Transaction';
