import { Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReceiptComponent } from '../../models/receipt-field.model';

@Component({
  selector: 'app-double-text-area',
  templateUrl: './double-text-area.component.html',
  styleUrls: ['./double-text-area.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DoubleTextAreaComponent),
    },
  ],
})
export class DoubleTextAreaComponent extends ReceiptComponent {


  form = new FormGroup({
    firstText: new FormControl('Пример текста'),
    secondText: new FormControl('Пример текста'),
    style: new FormControl('normal'),
    fontSize: new FormControl(15),
  });

}
