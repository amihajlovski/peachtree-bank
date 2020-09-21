import { Component, Input, OnInit } from '@angular/core';
import { ITransaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent implements OnInit {
  @Input()
  transactions: ITransaction[];

  constructor() {}

  ngOnInit(): void {}
}
