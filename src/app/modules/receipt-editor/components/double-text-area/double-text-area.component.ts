import { DoubleTextAreaFiled } from './../../models/receipt-field.model';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IReceiptComponent, IReceiptField, SimpleTextAreaFiled } from '../../models/receipt-field.model';

@Component({
  selector: 'app-double-text-area',
  templateUrl: './double-text-area.component.html',
  styleUrls: ['./double-text-area.component.css']
})
export class DoubleTextAreaComponent implements OnInit, IReceiptComponent {
  @Output() changeEvent = new EventEmitter();

  form = new FormGroup({
    firstText: new FormControl('Пример текста'),
    secondText: new FormControl('Пример текста'),
    style: new FormControl('normal'),
    fontSize: new FormControl(15),
  });

  getField(): IReceiptField {
    return new DoubleTextAreaFiled(this.form.getRawValue());
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => this.changeEvent.emit());
  }
}
