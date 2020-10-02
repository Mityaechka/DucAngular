import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ShopsService } from './../../../../../../services/shops.service';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Shop } from 'src/app/entities/shop.entity';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ReplaySubject } from 'rxjs';
import { ShopGroupsService } from 'src/app/services/shop-groups.service';

@Component({
  selector: 'app-shop-group-create',
  templateUrl: './shop-group-create.component.html',
  styleUrls: ['./shop-group-create.component.css'],
})
export class ShopGroupCreateComponent implements OnInit {
  @Output() created = new EventEmitter();
  shops: Shop[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    list: new FormControl(undefined, [Validators.required]),
  });

  filterControl = new FormControl();

  filteredShops: ReplaySubject<Shop[]> = new ReplaySubject<Shop[]>(1);
  constructor(
    private shopGroupsService: ShopGroupsService,
    private shopsService: ShopsService,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.filterControl.valueChanges.subscribe(() => {
      this.filterShops();
    });

    this.dialogs.startLoading();
    const response = await this.shopsService.getAllShops();
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.shops = response.result.list;
    }
    this.detector.detectChanges();
    this.filteredShops.next(this.shops.slice());
  }
  async createGroup() {
    this.dialogs.startLoading();
    const response = await this.shopGroupsService.createGroup(
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();

    if (response.isSuccess) {
      this.created.emit();
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }

  filterShops() {
    if (!this.shops) {
      return;
    }
    let search = this.filterControl.value;
    if (!search) {
      this.filteredShops.next(this.shops.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredShops.next(
      this.shops.filter((shop) => shop.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
