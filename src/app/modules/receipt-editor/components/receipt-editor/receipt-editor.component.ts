import { AfterViewInit } from '@angular/core';
import { Component, OnInit, forwardRef } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-receipt-editor',
  templateUrl: './receipt-editor.component.html',
  styleUrls: ['./receipt-editor.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ReceiptEditorComponent),
    },
  ],
})
export class ReceiptEditorComponent
  implements AfterViewInit, ControlValueAccessor {
  form = new FormGroup({
    fields: new FormArray([]),
  });

  get fields() {
    return this.form.controls.fields as FormArray;
  }

  constructor() {}
  ngAfterViewInit(): void {}

  onChange = (data: any) => {};

  writeValue(obj: any[]): void {
    if (obj) {
      for (const o of obj) {
        this.addField(o.type, o.data);
      }
    }
    this.onChange(this.form.getRawValue());
  }
  registerOnChange(fn: (rating: number[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {}
  setDisabledState(isDisabled: boolean): void {}

  addField(type = '0', data?: any) {
    this.onChange(this.fields.getRawValue());

    const dataControl = new FormControl(data);
    const group = new FormGroup({
      type: new FormControl(type),
      data: dataControl,
    });
    this.fields.controls.push(group);

    dataControl.valueChanges.subscribe((value) => {
      this.onChange(this.fields.getRawValue());
    });
  }
  removeField(i: number) {
    this.fields.removeAt(i);
    this.onChange(this.fields.getRawValue());
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
