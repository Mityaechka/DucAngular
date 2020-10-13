import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { IReceiptComponent } from '../../models/receipt-field.model';
import { ReceiptPreviewComponent } from '../receipt-preview/receipt-preview.component';

@Component({
  selector: 'app-receipt-editor',
  templateUrl: './receipt-editor.component.html',
  styleUrls: ['./receipt-editor.component.css']
})
export class ReceiptEditorComponent implements AfterViewInit {
  @ViewChildren('field') fieldsComponents: QueryList<IReceiptComponent>;
  @ViewChild('preview') previewComponent: ReceiptPreviewComponent;

  form = new FormGroup({
    fields: new FormArray([]),
  });
  get fields() {
    return this.form.controls.fields as FormArray;
  }
  constructor() {}

  ngAfterViewInit(): void {}
  redrawCanvas() {
    this.previewComponent.redrawCanvas()
  }
  getData() {
    return this.fieldsComponents?.map((x) => x.getField());
  }
  addField() {
    this.fields.controls.push(
      new FormGroup({
        type: new FormControl('0'),
      })
    );
  }
  removeField(i: number) {
    this.fields.removeAt(i);
  }
  move(shift, currentIndex) {
    let newIndex: number = currentIndex + shift;
    if (newIndex === -1) {
      newIndex = this.fields.length - 1;
    } else if (newIndex === this.fields.length) {
      newIndex = 0;
    }

    const currentGroup = this.fields.at(currentIndex);
    this.fields.removeAt(currentIndex);
    this.fields.insert(newIndex, currentGroup);
  }

  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1 === object2;
  }
}

