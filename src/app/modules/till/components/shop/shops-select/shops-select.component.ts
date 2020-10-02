import { ShopsService } from './../../../../../services/shops.service';
import { Group } from './../../../../../entities/group.entity';
import { FormControl, FormGroup } from '@angular/forms';
import { ShopGroupsService } from './../../../../../services/shop-groups.service';
import { DialogsService } from './../../../../../services/dialogs.service';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Shop } from 'src/app/entities/shop.entity';
import {
  filter,
  tap,
  takeUntil,
  debounceTime,
  map,
  delay,
} from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-shops-select',
  templateUrl: './shops-select.component.html',
  styleUrls: ['./shops-select.component.css'],
})
export class ShopsSelectComponent implements OnInit {
  @Output() selected = new EventEmitter<Shop[]>();

  groupsFilterControl = new FormControl();
  groupsControl = new FormControl();
  groups: Group<Shop>[] = [];
  filteredGroupsReplay: ReplaySubject<Group<Shop>[]> = new ReplaySubject<
    Group<Shop>[]
  >(1);

  shopsFilterControl = new FormControl();
  shopsControl = new FormControl();
  shops: Shop[] = [];
  filteredShopsReplay: ReplaySubject<Shop[]> = new ReplaySubject<Shop[]>(1);

  get selectedShops() {
    const shops: Shop[] = [];
    const groups = this.groupsControl.value as Group<Shop>[];
    if (groups && groups.length > 0) {
      shops.push(...[].concat(...groups.map((x) => x.list)));
    }
    if(this.shopsControl.value){
      shops.push(...this.shopsControl.value);
    }
    return shops.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos;
    });
  }
  constructor(
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef,
    private shopGroupsService: ShopGroupsService,
    private shopsService: ShopsService
  ) {}

  async ngOnInit() {
    this.groupsFilterControl.valueChanges.subscribe(() => {
      this.filterGroups();
    });
    this.dialogs.startLoading();
    const groupsResponse = await this.shopGroupsService.getGroups();
    this.dialogs.stopLoading();
    if (groupsResponse.isSuccess) {
      this.groups = groupsResponse.result.list;
      this.filteredGroupsReplay.next(this.groups.slice());
    }
    const shopsResponse = await this.shopsService.getAllShops();
    this.dialogs.stopLoading();
    if (shopsResponse.isSuccess) {
      this.shops = shopsResponse.result.list;
      this.filteredShopsReplay.next(this.shops.slice());
    }
    this.detector.detectChanges();
  }

  filterGroups() {
    if (!this.groups) {
      return;
    }
    let search = this.groupsFilterControl.value;
    if (!search) {
      this.filteredGroupsReplay.next(this.groups.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredGroupsReplay.next(
      this.groups.filter(
        (group) => group.name.toLowerCase().indexOf(search) > -1
      )
    );
  }
  filterShops() {
    if (!this.groups) {
      return;
    }
    let search = this.shopsFilterControl.value;
    if (!search) {
      this.filteredShopsReplay.next(this.shops.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredShopsReplay.next(
      this.shops.filter(
        (shop) => shop.name.toLowerCase().indexOf(search) > -1
      )
    );
  }
  selectShop(){
    this.selected.emit(this.selectedShops);
    this.dialogs.pop();
  }
}
