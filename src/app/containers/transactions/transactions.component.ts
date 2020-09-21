import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IBalance } from 'src/app/models/balance';
import { ITransaction } from 'src/app/models/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  balance$: Observable<IBalance>;
  merchants$: Observable<string[]>;
  transactions$: Observable<ITransaction[]>;

  private destroy$ = new ReplaySubject<boolean>(1);

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.balance$ = this.transactionsService.currentBalance$.pipe(
      takeUntil(this.destroy$)
    );

    this.merchants$ = this.transactionsService
      .getMerchants()
      .pipe(takeUntil(this.destroy$));

    this.transactions$ = this.transactionsService.currentTransactions$.pipe(
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
