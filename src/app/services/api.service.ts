import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IBalance } from '../models/balance';
import { ITransactionResponse } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  getAccountBalance(): Observable<IBalance> {
    return of({
      accountName: 'Free Checking (3692)',
      amount: 5824.76,
    });
  }

  getMerchants(): Observable<string[]> {
    return this.httpClient
      .get<ITransactionResponse>('/_mocks_/transactions.json')
      .pipe(
        map((response) => [
          ...new Set(response.data.map((item) => item.merchant)),
        ])
      );
  }
}
