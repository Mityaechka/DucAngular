import { ShopsSelectComponent } from './../../../shop/shops-select/shops-select.component';
import { ProductsService } from './../../../../../../services/products.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { FormControl, Validators, FormGroup, FormArray } from '@angular/forms';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { SaleFormsService } from 'src/app/services/sale-forms.service';
import { ShopsService } from 'src/app/services/shops.service';
import { Shop } from 'src/app/entities/shop.entity';
import { Product } from 'src/app/entities/product';
import { ShopProductSelectComponent } from '../../../shop/shop-product/shop-product-select/shop-product-select.component';

@Component({
  templateUrl: './sale-form-create.component.html',
  styleUrls: ['./sale-form-create.component.css'],
})
export class SaleFormCreateComponent implements OnInit {
  @Output() saleFormCreated = new EventEmitter<number>();
  shops: Shop[];

  products: Product[];
  form: FormGroup;
  get canConsigment() {
    const control = this.form.controls.canConsigment as FormControl;
    if (control.value) {
      this.maxTermConsigment.setValidators(Validators.required);
    } else {
      this.maxTermConsigment.setValidators(null);
    }
    this.maxTermConsigment.updateValueAndValidity();
    return control;
  }
  get maxTermConsigment() {
    return this.form.controls.maxTermConsigment as FormControl;
  }
  get selectedShops() {
    return this.form.controls.shopsValue as FormArray;
  }
  get selectedProducts() {
    return this.form.controls.productsValue as FormArray;
  }
  get otherShops() {
    let other = '';
    if (this.selectedShops.value.length > 1) {
      this.selectedShops.value.slice(1).forEach((x) => (other += `\n${x.name}`));
    }
    return other;
  }

  constructor(
    private dialogs: DialogsService,
    private saleFormsService: SaleFormsService,
    private shopsService: ShopsService,
    private productsService: ProductsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.form = new FormGroup({
      shops: new FormControl(),
      shopsValue: new FormControl(),
      products: new FormControl(),
      productsValue: new FormControl(),
      canConsigment: new FormControl(false),
      canImplement: new FormControl(false),
      maxTermConsigment: new FormControl(0, [
        Validators.required,
        Validators.min(0),
      ]),
      orderOnDelayConsignment: new FormControl(false),
      cash: new FormControl(false),
      cashless: new FormControl(false),
    });

    this.dialogs.startLoading();
    const shopsResponse = await this.shopsService.getAllShops();
    if (shopsResponse.isSuccess) {
      this.shops = shopsResponse.result.list;
    }
    const productsResponse = await this.productsService.getProducts();
    if (productsResponse.isSuccess) {
      this.products = productsResponse.result.list;
    }
    this.dialogs.stopLoading();
    this.detector.markForCheck();
  }
  async createSaleForm() {
    this.dialogs.startLoading();
    const respose = await this.saleFormsService.createSaleForm(
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();
    if (respose.isSuccess) {
      this.dialogs.pop();
      this.saleFormCreated.emit(respose.result);
    } else {
      this.dialogs.pushAlert(respose.errorMessage);
    }
    this.detector.markForCheck();
  }
  selectShops() {
    this.dialogs.push({
      component: ShopsSelectComponent,
      onInstance: (i) => {
        i.selected.subscribe((values: Shop[]) => {
          this.form.patchValue({
            shops: values.map((x) => x.id),
            shopsValue: values,
          });
        });
      },
    });
  }
  selectProducts() {
    this.dialogs.push({
      component: ShopProductSelectComponent,
      onInstance: (i) => {
        i.selected.subscribe((values: Product[]) => {
          this.form.patchValue({
            products: values?.map((x) => x.id),
            productsValue: values,
          });
        });
      },
    });
  }
}
