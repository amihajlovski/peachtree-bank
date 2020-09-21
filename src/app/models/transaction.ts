export interface ITransaction {
  amount: string;
  categoryCode: string;
  merchant: string;
  merchantLogo: string;
  transactionDate: number;
  transactionType: TransactionType;
}

export type TransactionType =
  | 'Online Transfer'
  | 'Card Payment'
  | 'Transaction';
