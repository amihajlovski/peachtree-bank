import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TransactionsListComponent } from './transactions-list.component';

describe('TransactionsListComponent', () => {
  let component: TransactionsListComponent;
  let fixture: ComponentFixture<TransactionsListComponent>;
  let transactionsElement: DebugElement;
  let transactionsContentElement: Element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionsListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListComponent);
    component = fixture.componentInstance;
    component.transactions = [
      {
        amount: '82.02',
        categoryCode: '#12a580',
        merchant: 'The Tea Lounge',
        merchantLogo: '',
        transactionDate: 1476933842000,
        transactionType: 'Card Payment',
      },
      {
        amount: '84.64',
        categoryCode: '#d51271',
        merchant: 'Texaco',
        merchantLogo: '',
        transactionDate: 1476926642000,
        transactionType: 'Card Payment',
      },
    ];
    transactionsElement = fixture.debugElement.query(By.css('.list'));
    transactionsContentElement = transactionsElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a list of transactions', fakeAsync(() => {
    expect(
      transactionsContentElement.querySelectorAll('.item').length
    ).toBeGreaterThan(0);
  }));
});
