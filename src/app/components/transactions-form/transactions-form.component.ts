import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBalance } from 'src/app/models/balance';
import { IMerchant } from 'src/app/models/merchant';
import { INewTransaction } from 'src/app/models/transaction';

@Component({
  selector: 'app-transactions-form',
  templateUrl: './transactions-form.component.html',
  styleUrls: ['./transactions-form.component.scss'],
})
export class TransactionsFormComponent implements OnInit, OnChanges {
  @Input()
  balance: IBalance;

  @Input()
  merchants: IMerchant[];

  @Input()
  allowedDebt: number;

  @Output()
  submitForm = new EventEmitter<INewTransaction>();

  transactionForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      fromAccount: [null, Validators.required],
      toAccount: [null, Validators.required],
      amount: [
        null,
        [
          Validators.required,
          Validators.pattern('^(\\d{1,})(,\\d{1,2})*(\\.\\d{1,2})?$'),
        ],
      ],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.balance?.currentValue) {
      this.transactionForm.patchValue({
        fromAccount: `${this.balance.accountName} - $${this.balance.amount}`,
        toAccount: null,
        amount: null,
      });
    }
  }

  onSubmit(): void {
    this.submitForm.next(this.transactionForm.value);
  }

  get amount(): number {
    return this.transactionForm.value.amount;
  }
}
