import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IBalance } from '../models/balance';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  getAccountBalance(): Observable<IBalance> {
    return of({
      accountName: 'Free Checking (3692)',
      amount: 5824.76,
    });
  }
}
