import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions-filters',
  templateUrl: './transactions-filters.component.html',
  styleUrls: ['./transactions-filters.component.scss'],
})
export class TransactionsFiltersComponent implements OnInit {
  activeSearch: string;

  constructor() {}

  ngOnInit(): void {}

  applySearch(): void {}
}
