import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IReceiptField } from '../../models/receipt-field.model';

@Component({
  selector: 'app-simple-text-area',
  templateUrl: './simple-text-area.component.html',
  styleUrls: ['./simple-text-area.component.css'],
})
export class SimpleTextAreaComponent implements OnInit, IReceiptField {
  form = new FormGroup({
    text: new FormControl(),
    align: new FormControl(),
    style: new FormControl(),
    size: new FormControl(),
  });

  drawField(): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {}
}
