import { Component, OnInit } from '@angular/core';
import { ISort } from 'src/app/models/sort';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-transactions-filters',
  templateUrl: './transactions-filters.component.html',
  styleUrls: ['./transactions-filters.component.scss'],
})
export class TransactionsFiltersComponent implements OnInit {
  activeSearch: string;
  activeSort: ISort;

  constructor(private filtersService: FiltersService) {}

  ngOnInit(): void {
    this.activeSearch = this.filtersService.activeFilter.search;
    this.activeSort = this.filtersService.activeFilter.sort;
  }

  applySearch(): void {
    this.filtersService.setFilterOptions({
      search: this.activeSearch,
      sort: this.activeSort,
    });
  }

  applySort(property: string): void {
    if (this.activeSort.property === property) {
      this.activeSort.direction =
        this.activeSort.direction === 'asc' ? 'desc' : 'asc';
    }
    this.activeSort.property = property;
    this.filtersService.setFilterOptions({
      search: this.activeSearch,
      sort: this.activeSort,
    });
  }
}
