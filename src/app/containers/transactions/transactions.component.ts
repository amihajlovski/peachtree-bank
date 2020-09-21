import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IBalance } from 'src/app/models/balance';
import { ITransaction } from 'src/app/models/transaction';
import { ApiService } from 'src/app/services/api.service';

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

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.balance$ = this.apiService.currentBalance$.pipe(
      takeUntil(this.destroy$)
    );

    this.merchants$ = this.apiService
      .getMerchants()
      .pipe(takeUntil(this.destroy$));

    this.transactions$ = this.apiService.currentTransactions$.pipe(
      takeUntil(this.destroy$)
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
