import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { combineLatest, forkJoin, Observable, of, ReplaySubject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IBalance, IBalanceRespone } from '../models/balance';
import { IFilter } from '../models/filter';
import { IMerchant } from '../models/merchant';
import {
  INewTransaction,
  ITransaction,
  ITransactionResponse,
} from '../models/transaction';
import { ALLOWED_DEBT } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private balance = new ReplaySubject<IBalance>(1);
  private transactions = new ReplaySubject<ITransaction[]>(1);
  private merchants = new ReplaySubject<IMerchant[]>(1);

  public currentBalance$ = this.balance.asObservable();
  public currentTransactions$ = this.transactions.asObservable();
  public merchants$ = this.merchants.asObservable();

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

  getTransactions(): Observable<ITransaction[]> {
    return this.httpClient
      .get<ITransactionResponse>(environment.transactionsApi)
      .pipe(
        map((response) => response.data),
        tap((transactions) => {
          const merchants: IMerchant[] = [];
          for (const trs of transactions) {
            if (!merchants.some((m) => m.name === trs.merchant)) {
              merchants.push({
                name: trs.merchant,
                logo: trs.merchantLogo,
              });
            }
          }
          this.merchants.next(merchants);
        })
      );
  }

  newTransaction(transaction: INewTransaction): Observable<boolean> {
    return combineLatest([
      this.currentBalance$,
      this.currentTransactions$,
    ]).pipe(
      take(1),
      switchMap(([currentBalance, currentTransactions]) => {
        const newBalance = currentBalance.amount - transaction.amount;

        if (newBalance > ALLOWED_DEBT) {
          const transactionInfo = currentTransactions.find(
            (t) => t.merchant === transaction.toAccount.name
          );

          const newTransaction: ITransaction = {
            ...transactionInfo,
            amount: transaction.amount.toString(),
            transactionDate: new Date().getTime(),
            transactionType: 'Online Transfer',
          };

          this.balance.next({
            ...currentBalance,
            amount: Number(
              (currentBalance.amount - transaction.amount).toFixed(2)
            ),
          });
          this.transactions.next([newTransaction, ...currentTransactions]);

          return of(true);
        }

        return of(false);
      })
    );
  }

  filterTransactions(filterOptions: IFilter): Observable<ITransaction[]> {
    return this.currentTransactions$.pipe(
      map((transactions) => {
        const filteredByQuery = !filterOptions?.search
          ? transactions
          : transactions.filter(
              (transaction) =>
                transaction.merchant
                  .toLowerCase()
                  .includes(filterOptions.search.toLowerCase()) ||
                transaction.amount.includes(filterOptions.search) ||
                transaction.transactionType
                  .toLowerCase()
                  .includes(filterOptions.search.toLowerCase())
            );

        if (!filterOptions?.sort) {
          return filteredByQuery;
        }

        filteredByQuery.sort((a, b) => {
          const firstValue = a[filterOptions.sort.property];
          const secondValue = b[filterOptions.sort.property];

          if (isNaN(firstValue) && isNaN(secondValue)) {
            if (firstValue > secondValue) {
              return 1;
            }
            if (firstValue < secondValue) {
              return -1;
            }
            return 0;
          } else {
            if (filterOptions.sort.direction === 'desc') {
              return secondValue - firstValue;
            } else {
              return firstValue - secondValue;
            }
          }
        });

        if (
          filterOptions.sort.direction === 'desc' &&
          filterOptions.sort.property === 'merchant'
        ) {
          filteredByQuery.reverse();
        }

        return filteredByQuery;
      })
    );
  }
}
