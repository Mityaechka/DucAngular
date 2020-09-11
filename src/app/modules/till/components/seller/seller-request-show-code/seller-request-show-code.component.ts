import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  templateUrl: './seller-request-show-code.component.html',
  styleUrls: ['./seller-request-show-code.component.css'],
})
export class SellerRequestShowCodeComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA)public code: string) {}

  ngOnInit(): void {}
}
