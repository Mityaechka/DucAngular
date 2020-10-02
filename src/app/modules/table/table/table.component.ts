import { TableService } from './../../../services/table.service';
import { DialogsService } from './../../../services/dialogs.service';
import { HttpService } from './../../../services/http.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  AfterContentInit,
  ViewChild,
  ContentChildren,
  QueryList,
  ChangeDetectorRef,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { MatTable, MatColumnDef } from '@angular/material/table';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements OnInit, AfterContentInit, OnDestroy {
  @Input() loadData: Function;
  @Input() assign: Function;
  columns: string[] = [];

  @Output() rowClick = new EventEmitter<T>();

  @ViewChild(MatTable, { static: true }) table: MatTable<T>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

  data: List<T>;
  isLoading = false;
  constructor(
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef,
    private tableService: TableService
  ) {}
  ngOnDestroy(): void {
    this.tableService.removeTable(this);
  }

  ngAfterContentInit() {
    this.columnDefs.forEach((columnDef) => {
      this.table.addColumnDef(columnDef);
      this.columns.push(columnDef.name);
    });
  }

  async ngOnInit() {
    await this.loadDataEvent();
    this.tableService.addTable(this);
  }
  async loadDataEvent() {
    this.isLoading = true;
    const response = await this.loadData();
    this.isLoading = false;
    if (response.isSuccess) {
      if (this.assign) {
        response.result.list = response.result.list.map((x) => {
          return this.assign(x);
        });
      }
      this.data = response.result;
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
    this.detector.markForCheck();
  }
  onRowClick(row) {
    this.rowClick.emit(row);
  }
}
