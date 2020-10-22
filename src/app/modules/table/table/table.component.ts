import { FilterParametr, SortParametr } from './../../../models/filter.model';
import { TableService } from './../../../services/table.service';
import { DialogsService } from './../../../services/dialogs.service';
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
  ViewChildren,
  AfterViewInit,
} from '@angular/core';
import { MatTable, MatColumnDef } from '@angular/material/table';
import { List } from 'src/app/models/list.model';
import { FilterComponent } from '../filter/filter.component';
import { Filter } from 'src/app/models/filter.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> implements OnInit, AfterContentInit, OnDestroy {
  filter = new Filter();
  // tslint:disable-next-line: no-input-rename
  @Input('loadData') loadDataFunction: Function;
  @Input() assign: Function;

  columns: string[] = [];
  footer: string[] = [];

  @Output() rowClick = new EventEmitter<T>();

  @ViewChild(MatTable, { static: true }) table: MatTable<T>;
  @ContentChildren(MatColumnDef) columnDefs: QueryList<MatColumnDef>;

  data: List<T>;
  @Input() set rawData(value: any[]) {
    if (value) {
      this.data = List.createList(value);
    }
  }
  @Input() showPagination = true;
  @Input() hover = true;

  isLoading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
      if (columnDef.footerCell) {
        this.footer.push(columnDef.name);
      }
    });
  }
  async ngOnInit() {
    await this.loadData();
    this.tableService.addTable(this);
  }
  async loadData() {
    if (this.loadDataFunction) {
      this.isLoading = true;
      const response = await this.loadDataFunction(this.filter);
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
  }
  page() {
    this.filter.page = this.paginator.pageIndex;
    this.loadData();
  }
  onRowClick(row) {
    this.rowClick.emit(row);
  }
  addFilter(filterParametr: FilterParametr) {
    const oldParametr = this.filter.filterParametrs.find(
      (x) => x.parametr === filterParametr.parametr
    );
    if (oldParametr) {
      oldParametr.data = filterParametr.data;
      oldParametr.operator = filterParametr.operator;
    } else {
      this.filter.filterParametrs.push(filterParametr);
    }
    this.loadData();
  }
  removeFilter(parametr: string) {
    this.filter.filterParametrs = this.filter.filterParametrs.filter(
      (x) => x.parametr !== parametr
    );
    this.loadData();
  }
  addSort(parametr: SortParametr) {
    this.filter.sortParametr = parametr;
    this.loadData();
  }
}
