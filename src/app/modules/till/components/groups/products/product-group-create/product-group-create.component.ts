import { LeftsService } from './../../../../../../services/lefts.service';
import { Product } from './../../../../../../entities/product';
import { ProductsService } from './../../../../../../services/products.service';
import { ProductGroupsService } from './../../../../../../services/product-groups.service';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { Shop } from 'src/app/entities/shop.entity';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ProductLeft } from 'src/app/entities/product-left.entity';

@Component({
  selector: 'app-product-group-create',
  templateUrl: './product-group-create.component.html',
  styleUrls: ['./product-group-create.component.css'],
})
export class ProductGroupCreateComponent implements OnInit {
  @Output() created = new EventEmitter();
  productLefts: ProductLeft[] = [];

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    list: new FormControl(undefined, [Validators.required]),
  });

  filterControl = new FormControl();

  filteredProducts = new ReplaySubject<ProductLeft[]>(1);
  constructor(
    private productGroupsService: ProductGroupsService,
    private productsService: ProductsService,
    private leftsService: LeftsService,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.filterControl.valueChanges.subscribe(() => {
      this.filterShops();
    });

    this.dialogs.startLoading();
    const response = await this.leftsService.getProductsLefts();
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.productLefts = response.result.list;
    }
    this.detector.detectChanges();
    this.filteredProducts.next(this.productLefts.slice());
  }
  async createGroup() {
    this.dialogs.startLoading();
    const response = await this.productGroupsService.createGroup(
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
    if (!this.productLefts) {
      return;
    }
    let search = this.filterControl.value;
    if (!search) {
      this.filteredProducts.next(this.productLefts.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredProducts.next(
      this.productLefts.filter(
        (product) => product.product.name.toLowerCase().indexOf(search) > -1
      )
    );
  }
}
