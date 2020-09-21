import { IMerchant } from './merchant';

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

export interface INewTransaction {
  toAccount: IMerchant;
  amount: number;
}

export type TransactionType =
  | 'Online Transfer'
  | 'Card Payment'
  | 'Transaction';
