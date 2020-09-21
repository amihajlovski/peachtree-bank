import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { forkJoin, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBalance, IBalanceRespone } from '../models/balance';
import { ITransaction, ITransactionResponse } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private balance = new ReplaySubject<IBalance>(1);
  private transactions = new ReplaySubject<ITransaction[]>(1);

  public currentBalance$ = this.balance.asObservable();
  public currentTransactions$ = this.transactions.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
    this.router.events
      .pipe(
        filter((evt) => evt instanceof NavigationEnd),
        distinctUntilChanged(),
        switchMap(() =>
          forkJoin([this.getAccountBalance(), this.getTransactions()])
        )
      )
      .subscribe(([balance, transactions]) => {
        this.balance.next(balance);
        this.transactions.next(transactions);
      });
  }

  getAccountBalance(): Observable<IBalance> {
    return this.httpClient
      .get<IBalanceRespone>(environment.balanceApi)
      .pipe(map((response) => response.data));
  }

  getMerchants(): Observable<string[]> {
    return this.httpClient
      .get<ITransactionResponse>(environment.transactionsApi)
      .pipe(
        map((response) => [
          ...new Set(response.data.map((item) => item.merchant)),
        ])
      );
  }

  getTransactions(): Observable<ITransaction[]> {
    return this.httpClient
      .get<ITransactionResponse>(environment.transactionsApi)
      .pipe(map((response) => response.data));
  }
}
