import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { IReceiptField } from '../../models/receipt-field.model';

@Component({
  selector: 'app-example-editor',
  templateUrl: './example-editor.component.html',
  styleUrls: ['./example-editor.component.css']
})
export class ExampleEditorComponent implements OnInit {
  @ViewChildren('field') fields: QueryList<IReceiptField>;
  constructor() { }

  ngOnInit(): void {
  }
}
