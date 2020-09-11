import { ProductLeft } from '../../../../../entities/product-left.entity';
import { SellerCreateRequestDialogComponent } from './../seller-create-request-dialog/seller-create-request-dialog.component';
import { LeftsService } from './../../../../../services/lefts.service';
import { Component, OnInit } from '@angular/core';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ProductRequest } from 'src/app/entities/product-request.entity';
import { SellerRequestInfoComponent } from '../seller-request-info/seller-request-info.component';

@Component({
  selector: 'app-seller-create-request',
  templateUrl: './seller-create-request.component.html',
  styleUrls: ['./seller-create-request.component.css'],
})
export class SellerCreateRequestComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type', 'supplierShop', 'price'];
  constructor(
    private leftsService: LeftsService,
    private dialogs: DialogsService
  ) {}

  async ngOnInit() {}
  async loadData() {
    return this.leftsService.getProviderProductsLefts();
  }
  selectLeft(productLeft: ProductLeft) {
    this.dialogs.push({
      component: SellerCreateRequestDialogComponent,
      data: productLeft,
    });
    // this.dialogs.startLoading();
    // const response = await this.requestService.getSellerRequest(request.id);
    // this.dialogs.stopLoading();
    // if (response.isSuccess) {
    //   this.dialogs.push({ component: SellerRequestInfoComponent });
    // } else {
    //   this.dialogs.pushAlert(response.errorMessage);
    // }
  }
}
