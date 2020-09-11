import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ProductRequest } from 'src/app/entities/product-request.entity';
import { ProviderRequestInfoComponent } from '../../provider/provider-request-info/provider-request-info.component';
import { ProviderRequestConfirmComponent } from '../../provider/provider-request-confirm/provider-request-confirm.component';
import { SellerRequestInfoComponent } from '../seller-request-info/seller-request-info.component';

@Component({
  selector: 'app-seller-requests',
  templateUrl: './seller-requests.component.html',
  styleUrls: ['./seller-requests.component.css'],
})
export class SellerRequestsComponent implements OnInit {
  displayedColumns: string[] = ['fromShop', 'totalSum', 'payedSum', 'leftSum'];
  constructor(
    private requestService: RequestService,
    private dialogs: DialogsService
  ) {}

  async ngOnInit() {}
  async loadData() {
    return this.requestService.getSellerRequests();
  }
  async selectRequest(request: ProductRequest) {
    this.dialogs.push({ component: SellerRequestInfoComponent, data: request });
  }
}
