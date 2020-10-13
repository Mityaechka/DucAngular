import { SaleForm } from 'src/app/entities/sale-form.entity';
import { RequestService } from 'src/app/services/request.service';
import { DialogsService } from './../../../../../services/dialogs.service';
import { LeftsService } from './../../../../../services/lefts.service';
import { ProductLeft } from '../../../../../entities/product-left.entity';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './seller-create-request-dialog.component.html',
  styleUrls: ['./seller-create-request-dialog.component.css'],
})
export class SellerCreateRequestDialogComponent implements OnInit {
  today = new Date().toJSON().split('T')[0];
  saleForm: SaleForm;

  directDiscount: number;

  get totalSum() {
    return this.currentCount * this.productLeft.price;
  }
  get markup() {
    return this.form.controls.markup.value;
  }
  get currentCount() {
    return this.form.controls.count.value;
  }
  get saleFormType() {
    return this.form.controls.saleFormType.value;
  }
  get totalDiscountSum() {
    return this.totalSum + this.totalSum * (this.directDiscount / 100);
  }
  form = new FormGroup({
    count: new FormControl(0, [Validators.required, Validators.min(1)]),
    markup: new FormControl(0, [Validators.required, Validators.min(0)]),
    planeDeliveryDate: new FormControl('', [Validators.required]),
    saleFormType: new FormControl(0),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public productLeft: ProductLeft,
    private leftsService: LeftsService,
    private requestService: RequestService,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.loadData();
  }
  async loadData() {
    this.dialogs.startLoading();
    const leftResponse = await this.leftsService.getProviderProductsLeft(
      this.productLeft.id
    );

    if (leftResponse.isSuccess) {
      this.form.patchValue({
        markup: leftResponse.result.markup,
      });
      this.productLeft = leftResponse.result;
      const amountResponse = await this.leftsService.getDirectDiscount(
        this.productLeft.id
      );
      if (amountResponse.isSuccess) {
        this.directDiscount = amountResponse.result;
      }
      const saleFormResponse = await this.leftsService.getSaleForm(
        this.productLeft.id
      );
      if (saleFormResponse.isSuccess) {
        this.saleForm = saleFormResponse.result;
      }
      this.dialogs.stopLoading();
    } else {
      this.dialogs.stopLoading();
      this.dialogs.pop();
      this.dialogs.pushAlert(leftResponse.errorMessage);
    }
    this.detector.markForCheck();
  }

  async createrRequest() {
    this.dialogs.startLoading();
    const request = await this.requestService.createRequest(
      this.productLeft.id,
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();
    if (request.isSuccess) {
      this.dialogs.pop();
      this.dialogs.pushAlert('Заказ успешно создан');
    } else {
      this.dialogs.pushAlert(request.errorMessage);
    }
  }
}
