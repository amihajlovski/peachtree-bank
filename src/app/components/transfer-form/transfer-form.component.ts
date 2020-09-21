import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBalance } from 'src/app/models/balance';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent implements OnInit {
  @Input()
  balance: IBalance;

  @Input()
  merchants: string[];

  transferForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.transferForm = this.formBuilder.group({
      fromAccount: [`${this.balance.accountName} - $${this.balance.amount}`],
      toAccount: [null, Validators.required],
      amount: [null, [Validators.required]],
    });
  }
}
