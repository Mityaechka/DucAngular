import {
  Component,
  EventEmitter,
  forwardRef,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  IReceiptField,
  IndentAreaFiled,
  LineAreaFiled,
  ReceiptComponent,
} from '../../models/receipt-field.model';

@Component({
  selector: 'app-line-area',
  templateUrl: './line-area.component.html',
  styleUrls: ['./line-area.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => LineAreaComponent),
    },
  ],
})
export class LineAreaComponent extends ReceiptComponent {
  form = new FormGroup({
    symbol: new FormControl('-'),
    fontSize: new FormControl(80),
  });
}
