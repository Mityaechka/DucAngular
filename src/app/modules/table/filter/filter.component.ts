import { TableComponent } from 'src/app/modules/table/table/table.component';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { OperatioType } from './../../../enums/operation-type.enum';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { FilterParametr, OperatorEnum } from 'src/app/models/filter.model';
import { MatHeaderCell } from '@angular/material/table';
import { CdkColumnDef } from '@angular/cdk/table';
import { QueryValueType } from '@angular/compiler/src/core';
type FilterType = 'equal' | 'notEqual' | 'contains';
type ValueType = 'number' | 'string' | 'enum';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent implements OnInit {
  isUse = false;
  @Output() filtred = new EventEmitter<FilterParametr>();
  @Input() parentTable: TableComponent<any>;

  @Input() path: string;
  @Input() type: ValueType;
  @Input() enum: string[];
  isOpen = false;

  enumGroup = new FormGroup({
    value: new FormControl(undefined, [Validators.required]),
  });
  numberGroup = new FormGroup({
    value: new FormControl(0, [Validators.required]),
    type: new FormControl(0, [Validators.required]),
  });
  stringGroup = new FormGroup({
    value: new FormControl(undefined, [Validators.required]),
    type: new FormControl(0, [Validators.required]),
  });

  get valid() {
    switch (this.type) {
      case 'number':
        return this.numberGroup.valid;
      case 'enum':
        return this.enumGroup.valid;
      case 'string':
        return this.stringGroup.valid;
      default:
        return false;
    }
  }
  constructor() {}

  ngOnInit(): void {}

  filter() {
    if (!this.valid) {
      return;
    }
    let parametr: FilterParametr;
    switch (this.type) {
      case 'enum':
        parametr = {
          parametr: this.path,
          operator: OperatorEnum.Equal,
          data: this.enumGroup.controls.value.value,
        };
        break;
      case 'number':
        parametr = {
          parametr: this.path,
          operator: this.numberGroup.controls.type.value,
          data: this.numberGroup.controls.value.value,
        };
        break;
      case 'string':
        parametr = {
          parametr: this.path,
          operator: this.stringGroup.controls.type.value,
          data: this.stringGroup.controls.value.value,
        };
        break;
    }
    if (this.parentTable) {
      this.parentTable.addFilter(parametr);
      this.isUse = true;
    }
  }
  removeFilter() {
    if (this.parentTable) {
      this.parentTable.removeFilter(this.path);
      this.isUse = false;
      //this.isOpen = false;
    }
  }
  backdropClick(){
    this.isOpen = false;
  }
}
