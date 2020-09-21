import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBalance } from 'src/app/models/balance';

@Component({
  selector: 'app-transactions-form',
  templateUrl: './transactions-form.component.html',
  styleUrls: ['./transactions-form.component.scss'],
})
export class TransactionsFormComponent implements OnInit, OnChanges {
  @Input()
  balance: IBalance;

  @Input()
  merchants: string[];

  transferForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.transferForm = this.formBuilder.group({
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
      this.transferForm.patchValue({
        fromAccount: `${this.balance.accountName} - $${this.balance.amount}`,
      });
    }
  }
}
