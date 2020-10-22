import { ReceiptComponent, TableAreaFiled } from './../../models/receipt-field.model';
import { Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  IReceiptField,
} from '../../models/receipt-field.model';

@Component({
  selector: 'app-table-area',
  templateUrl: './table-area.component.html',
  styleUrls: ['./table-area.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TableAreaComponent),
    },
  ],
})
export class TableAreaComponent extends ReceiptComponent {
  form = new FormGroup({
    fontSize: new FormControl(15),
    showBorder: new FormControl(false),
    headers: new FormArray([]),
    data: new FormArray([new FormArray([])]),
  });
  get headers() {
    return this.form.controls.headers as FormArray;
  }
  get data() {
    return this.form.controls.data as FormArray;
  }
  get rows() {
    return (this.form.controls.data as FormArray).controls[0] as FormArray;
  }
  getRow(i: number) {
    return this.rows.controls[i] as FormArray;
  }



  addHeaders() {
    this.headers.push(
      new FormGroup({
        width: new FormControl(1),
        name: new FormControl('Пример текста'),
      })
    );
  }
  removeHeader(i: number) {
    this.headers.removeAt(i);
    this.form.patchValue({});
  }
  addRow() {
    this.rows.push(new FormArray([]));
    this.form.patchValue({});
  }
  removeRow(i: number) {
    this.rows.removeAt(i);
    this.form.patchValue({});
  }
  addColumn(i) {
    this.getRow(i).push(
      new FormGroup({
        value: new FormControl('Пример текста'),
        align: new FormControl('left'),
        width: new FormControl(1),
      })
    );
  }
  removeColumn(row: number, column: number) {
    this.getRow(row).removeAt(column);
    this.form.patchValue({});
  }
}
