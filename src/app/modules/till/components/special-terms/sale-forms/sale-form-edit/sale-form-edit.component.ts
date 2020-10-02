import { ShopProductSelectComponent } from './../../../shop/shop-product/shop-product-select/shop-product-select.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  Inject,
} from '@angular/core';
import { Shop } from 'src/app/entities/shop.entity';
import { Product } from 'src/app/entities/product';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { DialogsService } from 'src/app/services/dialogs.service';
import { SaleFormsService } from 'src/app/services/sale-forms.service';
import { ShopsService } from 'src/app/services/shops.service';
import { ProductsService } from 'src/app/services/products.service';
import { SaleForm } from 'src/app/entities/sale-form.entity';
import { ShopsSelectComponent } from '../../../shop/shops-select/shops-select.component';

@Component({
  selector: 'app-sale-form-edit',
  templateUrl: './sale-form-edit.component.html',
  styleUrls: ['./sale-form-edit.component.css'],
})
export class SaleFormEditComponent implements OnInit {
  @Output() saleFormEdited = new EventEmitter<number>();
  shops: Shop[];
  products: Product[];
  form: FormGroup = new FormGroup({
    shops: new FormControl(),
    shopsValue: new FormControl(),
    products: new FormControl(),
    productsValue: new FormControl(),
    canConsigment: new FormControl(),
    canImplement: new FormControl(false),
    maxTermConsigment: new FormControl(0, [
      Validators.required,
      Validators.min(0),
    ]),
    orderOnDelayConsignment: new FormControl(false),
    cash: new FormControl(false),
    cashless: new FormControl(false),
  });
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

  constructor(
    @Inject(MAT_DIALOG_DATA) private saleForm: SaleForm,
    private dialogs: DialogsService,
    private saleFormsService: SaleFormsService,
    private shopsService: ShopsService,
    private productsService: ProductsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();

    const shopsResponse = await this.shopsService.getAllShops();
    if (shopsResponse.isSuccess) {
      this.shops = shopsResponse.result.list;
    }
    const productsResponse = await this.productsService.getProducts();
    if (productsResponse.isSuccess) {
      this.products = productsResponse.result.list;
    }
    const saleFormResponse = await this.saleFormsService.getSaleForm(
      this.saleForm.id
    );
    if (saleFormResponse.isSuccess) {
      this.form = new FormGroup({
        shops: new FormControl(saleFormResponse.result.shops?.map((x) => x.id)),
        shopsValue: new FormControl(saleFormResponse.result.shops),
        products: new FormControl(saleFormResponse.result.products?.map((x) => x.id)),
        productsValue: new FormControl(saleFormResponse.result.products),
        canConsigment: new FormControl(saleFormResponse.result.canConsigment),
        canImplement: new FormControl(saleFormResponse.result.canImplement),
        maxTermConsigment: new FormControl(
          saleFormResponse.result.maxTermConsignment,
          [Validators.required, Validators.min(0)]
        ),
        orderOnDelayConsignment: new FormControl(
          saleFormResponse.result.orderOnDelayConsignment
        ),
        cash: new FormControl(saleFormResponse.result.cash),
        cashless: new FormControl(saleFormResponse.result.cashless),
      });
    }

    this.dialogs.stopLoading();
    this.form.updateValueAndValidity();
    this.detector.markForCheck();
  }
  async saveSaleForm() {
    this.dialogs.startLoading();
    const respose = await this.saleFormsService.editSaleForm(
      Object.assign(this.form.getRawValue(), { id: this.saleForm.id })
    );
    this.dialogs.stopLoading();
    if (respose.isSuccess) {
      this.dialogs.pop();
      this.saleFormEdited.emit(respose.result);
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
            shops: values?.map((x) => x.id),
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
