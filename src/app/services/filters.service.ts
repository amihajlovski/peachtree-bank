import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { IFilter } from '../models/filter';
import { ISort } from '../models/sort';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private filter = new ReplaySubject<IFilter>(1);
  public filter$: Observable<IFilter> = this.filter
    .asObservable()
    .pipe(debounceTime(1000), distinctUntilChanged());

  constructor() {}

  setFilterOptions(search: string, sort: ISort): void {
    this.filter.next({
      search,
      sort,
    });
  }
}
