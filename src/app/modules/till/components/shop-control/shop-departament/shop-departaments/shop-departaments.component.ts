import { ShopDepartamentCreateComponent } from './../shop-departament-create/shop-departament-create.component';
import { ShopTypeDisplay } from './../../../../../../enums/shop-type.enum';
import { Component, OnInit } from '@angular/core';
import { ShopsService } from 'src/app/services/shops.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-shop-departaments',
  templateUrl: './shop-departaments.component.html',
  styleUrls: ['./shop-departaments.component.css'],
})
export class ShopDepartamentsComponent implements OnInit {
  ShopTypeDisplay = ShopTypeDisplay;
  constructor(
    private shopsService: ShopsService,
    private dialogs: DialogsService,
    private tableService: TableService
  ) {}

  async ngOnInit() {}
  async loadData() {
    return this.shopsService.getChildrenShops();
  }
  createDepartament() {
    this.dialogs.push({
      component: ShopDepartamentCreateComponent,
      onInstance: (i) => {
        i.created.subscribe(() => {
          this.tableService.tables.forEach((x) => x.table.loadDataEvent());
        });
      },
    });
  }
  async selectDepartament(shopId: number) {
    this.dialogs.startLoading();
    const response = await this.shopsService.selectShop(shopId);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      location.reload();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
