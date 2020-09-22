import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private search = new ReplaySubject<string>(1);
  search$: Observable<string> = this.search
    .asObservable()
    .pipe(debounceTime(1000), distinctUntilChanged());

  constructor() {}

  setSearchQuery(query: string): void {
    this.search.next(query);
  }
}
