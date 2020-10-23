import { LogisticRequestShippComponent } from './../logistic-request-shipp/logistic-request-shipp.component';
import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ProductRequest } from 'src/app/entities/product-request.entity';
import { SellerRequestInfoComponent } from '../../seller/seller-request-info/seller-request-info.component';
import { LogisticRequestInfoComponent } from '../logistic-request-info/logistic-request-info.component';
import { LogisticRequestConfirmComponent } from '../logistic-request-confirm/logistic-request-confirm.component';

@Component({
  selector: 'app-logistic-requests',
  templateUrl: './logistic-requests.component.html',
  styleUrls: ['./logistic-requests.component.css'],
})
export class LogisticRequestsComponent implements OnInit {
  displayedColumns: string[] = ['toShop', 'totalSum', 'payedSum', 'leftSum'];
  constructor(
    private requestService: RequestService,
    private dialogs: DialogsService
  ) {}

  async ngOnInit() {}
  async loadData() {
    return this.requestService.getLogisticRequests();
  }
  async selectRequest(request: ProductRequest) {
    this.dialogs.startLoading();
    const response = await this.requestService.getLogisticRequest(request.id);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      debugger
      if (
        response.result.logisticProductRequest.isShipped &&
        response.result.totalSumToPaid === 0
      ) {
        this.dialogs.push({
          component: LogisticRequestInfoComponent,
          data: response.result,
        });
      } else {
        if (!response.result.hasActivePayRequest) {
          this.dialogs.push({
            component: LogisticRequestShippComponent,
            data: response.result,
          });
        } else {
          this.dialogs.push({
            component: LogisticRequestConfirmComponent,
            data: response.result,
          });
        }
      }
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
