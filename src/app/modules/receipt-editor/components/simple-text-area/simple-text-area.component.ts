import { SimpleTextAreaFiled } from './../../models/receipt-field.model';
import { FormGroup, FormControl } from '@angular/forms';
import {
  Component,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  AfterContentInit,
  AfterViewChecked,
} from '@angular/core';
import {
  IReceiptComponent,
  IReceiptField,
} from '../../models/receipt-field.model';
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
})
export class SimpleTextAreaComponent
  implements OnInit, AfterViewChecked, IReceiptComponent {
  ngAfterViewChecked(): void {
    this.changeEvent.emit();
  }

  @Output() changeEvent = new EventEmitter();

  form = new FormGroup({
    text: new FormControl('Пример текста'),
    align: new FormControl('left'),
    style: new FormControl('normal'),
    fontSize: new FormControl(15),
  });

  getField(): IReceiptField {
    return new SimpleTextAreaFiled(this.form.getRawValue());
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => this.changeEvent.emit());
  }
}
