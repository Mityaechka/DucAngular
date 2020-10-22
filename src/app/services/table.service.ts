import { TableComponent } from './../modules/table/table/table.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  // tslint:disable-next-line: variable-name
  private _tables: { name: string; table: TableComponent<any> }[] = [];
  get tables() {
    return this._tables;
  }
  constructor() {}
  addTable(t: TableComponent<any>) {
    this._tables.push({ name: '', table: t });
  }
  removeTable(t: TableComponent<any>) {
    this._tables = this._tables.filter((x) => x.table !== t);
  }
  reloadAll() {
    this.tables.forEach((x) => x.table.loadData());
  }
}
