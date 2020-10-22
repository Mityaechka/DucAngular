import { TableComponent } from './../table/table.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
})
export class SortComponent implements OnInit {
  direction = 0;
  @Input() path: string;
  @Input() parentTable: TableComponent<any>;
  constructor() {}

  ngOnInit(): void {}
  changeDirecction() {
    if (this.direction === 0) {
      this.direction = 1;
    } else if (this.direction === 1) {
      this.direction = 2;
    } else if (this.direction === 2) {
      this.direction = 0;
    }
    this.parentTable.addSort({ parametr: this.path, sort: this.direction });
  }
}
