import { ShopStaffCreateComponent } from './../shop-staff-create/shop-staff-create.component';
import { Component, OnInit } from '@angular/core';
import { ShopsService } from 'src/app/services/shops.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  templateUrl: './shop-staffs.component.html',
  styleUrls: ['./shop-staffs.component.css']
})
export class ShopStaffsComponent implements OnInit {

  constructor(
    private shopsService: ShopsService,
    private dialogs: DialogsService,
    private tableService: TableService
  ) {}

  async ngOnInit() {}
  async loadData() {
    return this.shopsService.getShopUsers();
  }
  createStaff(){
    this.dialogs.push({component:ShopStaffCreateComponent});
  }
}
