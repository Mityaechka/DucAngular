import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { IndentAreaFiled, IReceiptComponent, IReceiptField, SimpleTextAreaFiled } from '../../models/receipt-field.model';

@Component({
  selector: 'app-indent-area',
  templateUrl: './indent-area.component.html',
  styleUrls: ['./indent-area.component.css']
})
export class IndentAreaComponent implements OnInit, IReceiptComponent {
  @Output() changeEvent = new EventEmitter();

  form = new FormGroup({
    indent: new FormControl(10)
  });

  getField(): IReceiptField {
    return new IndentAreaFiled(this.form.getRawValue());
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => this.changeEvent.emit());
  }
}
