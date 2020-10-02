import { ProductGroupInfoComponent } from './../product-group-info/product-group-info.component';
import { ProductGroupCreateComponent } from './../product-group-create/product-group-create.component';
import { ProductGroupsService } from './../../../../../../services/product-groups.service';
import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/entities/group.entity';
import { Shop } from 'src/app/entities/shop.entity';
import { DialogsService } from 'src/app/services/dialogs.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-product-groups',
  templateUrl: './product-groups.component.html',
  styleUrls: ['./product-groups.component.css']
})
export class ProductGroupsComponent implements OnInit {

  constructor(
    private productGroupsService: ProductGroupsService,
    private dialogs: DialogsService,
    private table: TableService
  ) {}

  ngOnInit(): void {}
  async loadData() {
    return await this.productGroupsService.getGroups();
  }
  createGroup() {
    this.dialogs.push({
      component: ProductGroupCreateComponent,
      onInstance: (i) => {
        i.created.subscribe(() => {
          this.table.reloadAll();
        });
      },
    });
  }
  showGroup(group: Group<Shop>) {
    this.dialogs.push({ component: ProductGroupInfoComponent, data: group });
  }

}
