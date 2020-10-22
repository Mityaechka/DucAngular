import { ProviderCreateRequestComponent } from './../provider-create-request/provider-create-request.component';
import { DialogsService } from './../../../../../services/dialogs.service';
import { ShopsService } from 'src/app/services/shops.service';
import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/entities/shop.entity';

@Component({
  selector: 'app-provider-shops',
  templateUrl: './provider-shops.component.html',
  styleUrls: ['./provider-shops.component.css'],
})
export class ProviderShopsComponent implements OnInit {
  constructor(
    private shopsService: ShopsService,
    private dialogs: DialogsService
  ) {}
  async loadData() {
    return await this.shopsService.getAllProviderShops();
  }
  ngOnInit(): void {}
  open(provider: Shop) {
    this.dialogs.push({
      component: ProviderCreateRequestComponent,
      data: provider,
    });
  }
}
