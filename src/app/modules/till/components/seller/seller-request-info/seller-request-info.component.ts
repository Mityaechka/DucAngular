import { SellerRequestShowCodeComponent } from './../seller-request-show-code/seller-request-show-code.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestService } from 'src/app/services/request.service';
import { DialogsService } from './../../../../../services/dialogs.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductRequest } from 'src/app/entities/product-request.entity';

@Component({
  templateUrl: './seller-request-info.component.html',
  styleUrls: ['./seller-request-info.component.css'],
})
export class SellerRequestInfoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public productRequest: ProductRequest,
    private dialogs: DialogsService,
    private requestService: RequestService
  ) {}

  async ngOnInit() {
    await this.loadData();
  }
  async loadData() {
    this.dialogs.startLoading();
    const response = await this.requestService.getSellerRequest(
      this.productRequest.id
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.productRequest = response.result;
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
  async showCode() {
    this.dialogs.startLoading();
    const response = await this.requestService.getRequestCode(
      this.productRequest.id
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.dialogs.push({
        component: SellerRequestShowCodeComponent,
        data: response.result,
      });
    }else{
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
