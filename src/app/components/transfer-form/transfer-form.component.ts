import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transfer-form',
  templateUrl: './transfer-form.component.html',
  styleUrls: ['./transfer-form.component.scss'],
})
export class TransferFormComponent implements OnInit {
  transferForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.transferForm = this.formBuilder.group({
      fromAccount: [`Free Checking (3692) - $5824.76`],
      toAccount: [null, Validators.required],
      amount: [null, [Validators.required]],
    });
  }
}
