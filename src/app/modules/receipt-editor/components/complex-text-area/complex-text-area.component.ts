import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import {
  ComplexTextAreaFiled,
  IReceiptComponent,
  IReceiptField,
  SimpleTextAreaFiled,
} from '../../models/receipt-field.model';

@Component({
  selector: 'app-complex-text-area',
  templateUrl: './complex-text-area.component.html',
  styleUrls: ['./complex-text-area.component.css'],
})
export class ComplexTextAreaComponent implements OnInit, IReceiptComponent {
  @Output() changeEvent = new EventEmitter();

  form = new FormGroup({
    texts: new FormArray([]),
  });
  get texts() {
    return this.form.controls.texts as FormArray;
  }
  getField(): IReceiptField {
    return new ComplexTextAreaFiled(this.form.getRawValue());
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => this.changeEvent.emit());
  }

  addText() {
    this.texts.push(
      new FormGroup({
        text: new FormControl('Пример текста'),
        align: new FormControl('left'),
        style: new FormControl('normal'),
        fontSize: new FormControl(15),
        width: new FormControl(1),
      })
    );
  }
  removeText(i: number) {
    this.texts.removeAt(i);
  }
}
