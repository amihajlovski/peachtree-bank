import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { IBalance } from 'src/app/models/balance';
import { IMerchant } from 'src/app/models/merchant';
import { INewTransaction, ITransaction } from 'src/app/models/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';

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

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.balance$ = this.transactionsService.currentBalance$.pipe(
      takeUntil(this.destroy$)
    );

    this.merchants$ = this.transactionsService.merchants$.pipe(
      takeUntil(this.destroy$)
    );

    this.transactions$ = this.transactionsService.currentTransactions$.pipe(
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
