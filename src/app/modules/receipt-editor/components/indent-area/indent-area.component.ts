import { Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IndentAreaFiled, IReceiptField, ReceiptComponent, SimpleTextAreaFiled } from '../../models/receipt-field.model';

@Component({
  selector: 'app-indent-area',
  templateUrl: './indent-area.component.html',
  styleUrls: ['./indent-area.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => IndentAreaComponent),
    },
  ],
})
export class IndentAreaComponent extends ReceiptComponent {

  form = new FormGroup({
    indent: new FormControl(10)
  });

}
