import { ProductsService } from './../../../../../../services/products.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
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
  constructor(
    private dialogs: DialogsService,
    private saleFormsService: SaleFormsService,
    private shopsService: ShopsService,
    private productsService: ProductsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.form = new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      shopId: new FormControl(null, [Validators.required]),
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
}
