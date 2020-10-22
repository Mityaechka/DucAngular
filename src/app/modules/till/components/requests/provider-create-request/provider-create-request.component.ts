import { RequestService } from './../../../../../services/request.service';
import { LeftsService } from './../../../../../services/lefts.service';
import { SaleForm } from './../../../../../entities/sale-form.entity';
import { SaleFormType } from './../../../../../enums/sale-form-type.enum';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from './../../../../../entities/product';
import { Shop } from './../../../../../entities/shop.entity';
import { ShopsService } from 'src/app/services/shops.service';
import { DialogsService } from './../../../../../services/dialogs.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProviderSelectProductComponent } from '../provider-select-product/provider-select-product.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ProductLeft } from 'src/app/entities/product-left.entity';

@Component({
  selector: 'app-provider-create-request',
  templateUrl: './provider-create-request.component.html',
  styleUrls: ['./provider-create-request.component.css'],
})
export class ProviderCreateRequestComponent implements OnInit {
  planeDeliveryDate = new FormControl(undefined, [Validators.required]);

  selectedProducts: {
    productLeft: ProductLeft;
    count: number;
    markup: number;
    discount: number;
    saleForm: SaleForm;
  }[] = [];

  public selectedProductsSubject = new Subject<any[]>();
  get totalCount() {
    return this.selectedProducts.reduce((prev, cur) => {
      return prev + cur.count;
    }, 0);
  }
  get totalSum() {
    return this.selectedProducts.reduce((prev, cur) => {
      return (
        prev +
        (cur.productLeft.retailPrice -
          (cur.productLeft.retailPrice * cur.discount) / 100) *
          cur.count
      );
    }, 0);
  }
  get canCreateRequest() {
    return (
      this.planeDeliveryDate.valid &&
      this.selectedProducts &&
      this.selectedProducts.length !== 0 &&
      !this.selectedProducts.some((x) => x.count <= 0 || x.markup <= 0)
    );
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public provider: Shop,
    private dialogs: DialogsService,
    private shopsService: ShopsService,
    private leftsService: LeftsService,
    private dialogRef: MatDialogRef<ProviderCreateRequestComponent>,
    private detector: ChangeDetectorRef,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.dialogRef.updateSize('1500px');
  }

  selectProduct() {
    this.dialogs.push({
      component: ProviderSelectProductComponent,
      data: this.provider,
      onInstance: (i) => {
        i.selected.subscribe(async (data: ProductLeft) => {
          if (this.selectedProducts.some((x) => x.productLeft.id === data.id)) {
            this.dialogs.pushAlert('Этот остаток уже добавлен');
            return;
          }
          const discountResponse = await this.leftsService.getDirectDiscount(
            data.id
          );
          const saleFormResponse = await this.leftsService.getDirectDiscount(
            data.id
          );
          this.selectedProducts = [
            ...this.selectedProducts,
            {
              productLeft: data,
              count: 1,
              markup: data.markup,
              discount: discountResponse.isSuccess
                ? discountResponse.result
                : 0,
              saleForm: undefined,
            },
          ];
          this.selectedProductsSubject.next(this.selectedProducts);
        });
      },
    });
  }
  removeProduct(productLeftId: number) {
    this.selectedProducts = this.selectedProducts.filter(
      (x) => x.productLeft.id !== productLeftId
    );
    this.selectedProductsSubject.next(this.selectedProducts);
    this.detector.detectChanges();
  }
  async addRequest() {
    const products = this.selectedProducts.map((x) => {
      return {
        productLeftId: x.productLeft.id,
        count: x.count,
        markup: x.markup,
        saleForm: SaleFormType.None,
      };
    });
    const data = {
      products,
      planeDeliveryDate: this.planeDeliveryDate.value,
      providerShopId: this.provider.id,
    };
    this.dialogs.startLoading();
    const response = await this.requestService.createRequestForProductLefts(
      data
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.dialogs.popAll()
      this.dialogs.pushAlert('Заказ успешно создан');
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
