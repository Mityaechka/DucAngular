import {
  ReceiptComponent,
  SimpleTextAreaFiled,
} from './../../models/receipt-field.model';
import {
  FormGroup,
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import {
  Component,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  AfterContentInit,
  AfterViewChecked,
  Input,
  forwardRef,
} from '@angular/core';
import { IReceiptField } from '../../models/receipt-field.model';
declare function CanvasTextWrapper(
  canvas,
  text: string,
  textPos: { x: number; y: number },
  optionns: any
): void;

@Component({
  selector: 'app-simple-text-area',
  templateUrl: './simple-text-area.component.html',
  styleUrls: ['./simple-text-area.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SimpleTextAreaComponent),
    },
  ],
})
export class SimpleTextAreaComponent extends ReceiptComponent {
  form = new FormGroup({
    text: new FormControl('Пример текста'),
    align: new FormControl('left'),
    style: new FormControl('normal'),
    fontSize: new FormControl(15),
  });
}
