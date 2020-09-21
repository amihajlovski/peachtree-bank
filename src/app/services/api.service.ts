import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { IBalance, IBalanceRespone } from '../models/balance';
import { ITransactionResponse } from '../models/transaction';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private currentBalance = new ReplaySubject<IBalance>(1);
  public currentBalance$ = this.currentBalance.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
    this.router.events
      .pipe(
        filter((evt) => evt instanceof NavigationEnd),
        distinctUntilChanged(),
        switchMap(() => this.getAccountBalance())
      )
      .subscribe((evt) => {
        this.currentBalance.next(evt);
      });
  }

  getAccountBalance(): Observable<IBalance> {
    return this.httpClient
      .get<IBalanceRespone>('/_mocks_/balance.json')
      .pipe(map((response) => response.data));
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
