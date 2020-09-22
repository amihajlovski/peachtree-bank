import { Component, OnInit } from '@angular/core';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-transactions-filters',
  templateUrl: './transactions-filters.component.html',
  styleUrls: ['./transactions-filters.component.scss'],
})
export class TransactionsFiltersComponent implements OnInit {
  activeSearch = '';

  constructor(private filtersService: FiltersService) {}

  ngOnInit(): void {}

  applySearch(): void {
    this.filtersService.setSearchQuery(this.activeSearch);
  }
}
