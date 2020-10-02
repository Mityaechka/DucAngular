import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
})
export class MultiSelectComponent
  implements OnInit, OnDestroy {
  @Input() data: any[];

  @Input() display: (x) => any;

  dataMultiCtrl: FormControl = new FormControl();
  dataMultiFilterCtrl: FormControl = new FormControl();

  filteredDatasMulti: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  protected _onDestroy = new Subject<void>();

  constructor() {}


  ngOnInit(): void {
    this.dataMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterDatasMulti();
      });
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
  protected filterDatasMulti() {
    if (!this.data) {
      return;
    }
    let search = this.dataMultiFilterCtrl.value;
    if (!search) {
      this.filteredDatasMulti.next(this.data.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredDatasMulti.next(
      this.data.filter(
        (data) => this.display(data).toLowerCase().indexOf(search) > -1
      )
    );
  }
}
