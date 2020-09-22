import { Component, OnDestroy, OnInit } from '@angular/core';
import { merge, Observable, ReplaySubject } from 'rxjs';
import { startWith, switchMap, take, takeUntil } from 'rxjs/operators';
import { IBalance } from 'src/app/models/balance';
import { IMerchant } from 'src/app/models/merchant';
import { INewTransaction, ITransaction } from 'src/app/models/transaction';
import { FiltersService } from 'src/app/services/filters.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ALLOWED_DEBT } from 'src/app/utils/constants';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  balance$: Observable<IBalance>;
  merchants$: Observable<IMerchant[]>;
  transactions$: Observable<ITransaction[]>;

  private destroy$ = new ReplaySubject<boolean>(1);

  public allowedDebt = ALLOWED_DEBT;

  constructor(
    private transactionsService: TransactionsService,
    private filtersService: FiltersService
  ) {}

  ngOnInit(): void {
    this.balance$ = this.transactionsService.currentBalance$.pipe(
      takeUntil(this.destroy$)
    );

    this.merchants$ = this.transactionsService.merchants$.pipe(
      takeUntil(this.destroy$)
    );

    this.transactions$ = merge(
      this.transactionsService.currentTransactions$,
      this.filtersService.filter$
    ).pipe(
      startWith({}),
      switchMap((evt: any) => {
        console.log(evt);
        if (Array.isArray(evt)) {
          return this.transactionsService.currentTransactions$;
        }
        return this.transactionsService.filterTransactions(evt);
      }),
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  onNewTransaction(transaction: INewTransaction): void {
    this.transactionsService
      .newTransaction(transaction)
      .pipe(take(1))
      .subscribe();
  }
}
