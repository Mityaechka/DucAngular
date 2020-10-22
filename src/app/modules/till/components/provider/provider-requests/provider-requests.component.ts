import { TableComponent } from './../../../../table/table/table.component';
import { ProviderRequestConfirmComponent } from './../provider-request-confirm/provider-request-confirm.component';
import { ProviderRequestInfoComponent } from './../provider-request-info/provider-request-info.component';
import { DialogsService } from './../../../../../services/dialogs.service';
import { RequestService } from './../../../../../services/request.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductRequest } from 'src/app/entities/product-request.entity';

@Component({
  selector: 'app-provider-requests',
  templateUrl: './provider-requests.component.html',
  styleUrls: ['./provider-requests.component.css'],
})
export class ProviderRequestsComponent implements OnInit {
  @ViewChild('table') table: TableComponent<any>;
  constructor(
    private requestService: RequestService,
    private dialogs: DialogsService
  ) {}

  async ngOnInit() {}
  async loadData() {
    return this.requestService.getProviderRequests();
  }
  async selectRequest(request: ProductRequest) {
    this.dialogs.startLoading();
    const response = await this.requestService.getProviderRequest(request.id);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      if (response.result.isTransferredToLogistic) {
        this.dialogs.push({ component: ProviderRequestInfoComponent });
      } else {
        this.dialogs.push({
          component: ProviderRequestConfirmComponent,
          data: response.result,
          onInstance: (i) => {
            i.edited.subscribe(() => {
              this.table.loadData();
            });
          },
        });
      }
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
