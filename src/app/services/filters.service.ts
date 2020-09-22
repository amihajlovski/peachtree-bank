import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IFilter } from '../models/filter';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  activeFilter: IFilter;

  private filter = new ReplaySubject<IFilter>(1);
  public filter$: Observable<IFilter> = this.filter
    .asObservable()
    .pipe(debounceTime(1000), distinctUntilChanged());

  constructor() {
    this.activeFilter = {
      search: '',
      sort: {
        direction: 'desc',
        property: 'transactionDate',
      },
    };
  }

  setFilterOptions(filter: IFilter): void {
    this.activeFilter = filter;
    this.filter.next(filter);
  }
}
