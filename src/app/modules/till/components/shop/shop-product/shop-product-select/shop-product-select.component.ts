import { LeftsService } from './../../../../../../services/lefts.service';
import { ProductLeft } from './../../../../../../entities/product-left.entity';
import { ProductsService } from './../../../../../../services/products.service';
import { ProductGroupsService } from './../../../../../../services/product-groups.service';
import { Product } from './../../../../../../entities/product';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { Group } from 'src/app/entities/group.entity';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'app-shop-product-select',
  templateUrl: './shop-product-select.component.html',
  styleUrls: ['./shop-product-select.component.css'],
})
export class ShopProductSelectComponent implements OnInit {
  @Output() selected = new EventEmitter<ProductLeft[]>();

  groupsFilterControl = new FormControl();
  groupsControl = new FormControl();
  groups: Group<ProductLeft>[] = [];
  filteredGroupsReplay = new ReplaySubject<Group<ProductLeft>[]>(1);

  productsFilterControl = new FormControl();
  productsControl = new FormControl();
  product: ProductLeft[] = [];
  filteredProdcutsReplay = new ReplaySubject<ProductLeft[]>(1);

  get selectedProducts() {
    const products: ProductLeft[] = [];
    const groups = this.groupsControl.value as Group<ProductLeft>[];
    if (groups && groups.length > 0) {
      products.push(...[].concat(...groups.map((x) => x.list)));
    }
    if (this.productsControl.value) {
      products.push(...this.productsControl.value);
    }
    return products.filter((obj, pos, arr) => {
      return arr.map((mapObj) => mapObj.id).indexOf(obj.id) === pos;
    });
  }
  constructor(
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef,
    private productGroupsService: ProductGroupsService,
    private leftsService: LeftsService
  ) {}

  async ngOnInit() {
    this.groupsFilterControl.valueChanges.subscribe(() => {
      this.filterGroups();
    });
    this.dialogs.startLoading();
    const groupsResponse = await this.productGroupsService.getGroups();
    this.dialogs.stopLoading();
    if (groupsResponse.isSuccess) {
      this.groups = groupsResponse.result.list;
      this.filteredGroupsReplay.next(this.groups.slice());
    }
    const shopsResponse = await this.leftsService.getProductsLefts();
    this.dialogs.stopLoading();
    if (shopsResponse.isSuccess) {
      this.product = shopsResponse.result.list;
      this.filteredProdcutsReplay.next(this.product.slice());
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
  filterProducts() {
    if (!this.groups) {
      return;
    }
    let search = this.productsFilterControl.value;
    if (!search) {
      this.filteredProdcutsReplay.next(this.product.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredProdcutsReplay.next(
      this.product.filter(
        (shop) => shop.product.name.toLowerCase().indexOf(search) > -1
      )
    );
  }
  selectShop() {
    this.selected.emit(this.selectedProducts);
    this.dialogs.pop();
  }
}
