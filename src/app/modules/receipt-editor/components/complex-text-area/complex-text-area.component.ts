import { Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, FormArray, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  ReceiptComponent,
} from '../../models/receipt-field.model';

@Component({
  selector: 'app-complex-text-area',
  templateUrl: './complex-text-area.component.html',
  styleUrls: ['./complex-text-area.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ComplexTextAreaComponent),
    },
  ],
})
export class ComplexTextAreaComponent extends ReceiptComponent {
  form = new FormGroup({
    texts: new FormArray([]),
  });
  get texts() {
    return this.form.controls.texts as FormArray;
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
