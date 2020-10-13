import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IReceiptComponent, IReceiptField, IndentAreaFiled, LineAreaFiled } from '../../models/receipt-field.model';

@Component({
  selector: 'app-line-area',
  templateUrl: './line-area.component.html',
  styleUrls: ['./line-area.component.css']
})
export class LineAreaComponent implements OnInit, IReceiptComponent {
  @Output() changeEvent = new EventEmitter();

  form = new FormGroup({
    symbol: new FormControl('-'),
    fontSize: new FormControl(80),
  });

  getField(): IReceiptField {
    return new LineAreaFiled(this.form.getRawValue());
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => this.changeEvent.emit());
  }
}
