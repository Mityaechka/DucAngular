import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-supply-debt-pay-request-code',
  templateUrl: './supply-debt-pay-request-code.component.html',
  styleUrls: ['./supply-debt-pay-request-code.component.css'],
})
export class SupplyDebtPayRequestCodeComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public code: number) {}

  ngOnInit(): void {}
}
