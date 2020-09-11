import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductRequest } from 'src/app/entities/product-request.entity';
import { RequestService } from 'src/app/services/request.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { Shop } from 'src/app/entities/shop.entity';
import { User } from 'src/app/entities/user.entity';

@Component({
  templateUrl: './provider-request-confirm.component.html',
  styleUrls: ['./provider-request-confirm.component.css'],
})
export class ProviderRequestConfirmComponent implements OnInit {
  logisticticShops: Shop[];
  dirvers: User[];

  logisticCompanyId: number;
  logisticDriverId: number;

  canConfirmRequest = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public productRequest: ProductRequest,
    private requestService: RequestService,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef
  ) {}
  async ngOnInit() {
    await this.loadData();
  }
  async loadData() {
    const requestResponse = await this.requestService.getProviderRequest(
      this.productRequest.id
    );
    if (requestResponse.isSuccess) {
      this.productRequest = requestResponse.result;

      const logisticResponse = await this.requestService.getLogistcChildren();

      if (logisticResponse.isSuccess) {
        this.logisticticShops = logisticResponse.result;
      }

      if (this.productRequest.logisticProductRequest) {
        if (this.productRequest.logisticProductRequest.shop) {
          this.logisticCompanyId = this.productRequest.logisticProductRequest.shop.id;
          const driversResponse = await this.requestService.getLogistcDrivers(
            this.productRequest.logisticProductRequest.shop.id
          );
          if (driversResponse.isSuccess) {
            this.dirvers = driversResponse.result;
          }
        }
        if (this.productRequest.logisticProductRequest.user) {
          this.logisticDriverId = this.productRequest.logisticProductRequest.user.id;
        }
      }
      this.canConfirmRequest =
        this.productRequest.logisticProductRequest &&
        this.productRequest.logisticProductRequest.user &&
        this.productRequest.logisticProductRequest.shop &&
        !this.productRequest.logisticProductRequest.isConfirm;
    }

    this.detector.markForCheck();
  }
  async onCompanySelect(id) {
    this.dialogs.startLoading();
    const response = await this.requestService.changeRequestLogisticCompany(
      this.productRequest.id,
      id.value
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      await this.loadData();
    }
    this.detector.markForCheck();
  }
  async onDriverSelect(id) {
    this.dialogs.startLoading();
    const response = await this.requestService.changeRequestLogisticDriver(
      this.productRequest.id,
      id.value
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      await this.loadData();
    }
    this.detector.markForCheck();
  }
  async onDateChange(date) {
    this.dialogs.startLoading();
    const response = await this.requestService.changeDeliveryDate(
      this.productRequest.id,
      date.target.value
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      await this.loadData();
    }
    this.detector.markForCheck();
  }
  async confirmRequest() {
    this.dialogs.startLoading();
    const response = await this.requestService.confirmRequest(
      this.productRequest.id
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.dialogs.pop();
      this.dialogs.pushAlert('Данный заказ успешно подтврежден');
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
