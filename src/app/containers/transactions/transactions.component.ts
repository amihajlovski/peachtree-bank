import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IBalance } from 'src/app/models/balance';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css'],
})
export class TransactionsComponent implements OnInit, OnDestroy {
  balance$: Observable<IBalance>;

  private destroy$ = new ReplaySubject<boolean>(1);

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.balance$ = this.apiService
      .getAccountBalance()
      .pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
