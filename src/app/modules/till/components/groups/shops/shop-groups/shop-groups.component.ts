import { ShopGroupInfoComponent } from './../shop-group-info/shop-group-info.component';
import { Group } from './../../../../../../entities/group.entity';
import { ShopGroupCreateComponent } from './../shop-group-create/shop-group-create.component';
import { DialogsService } from './../../../../../../services/dialogs.service';
import { Component, OnInit } from '@angular/core';
import { ShopGroupsService } from 'src/app/services/shop-groups.service';
import { TableService } from 'src/app/services/table.service';
import { Shop } from 'src/app/entities/shop.entity';

@Component({
  selector: 'app-shop-groups',
  templateUrl: './shop-groups.component.html',
  styleUrls: ['./shop-groups.component.css'],
})
export class ShopGroupsComponent implements OnInit {
  constructor(
    private shopGroupsService: ShopGroupsService,
    private dialogs: DialogsService,
    private table: TableService
  ) {}

  ngOnInit(): void {}
  async loadData() {
    return await this.shopGroupsService.getGroups();
  }
  createGroup() {
    this.dialogs.push({
      component: ShopGroupCreateComponent,
      onInstance: (i) => {
        i.created.subscribe(() => {
          this.table.reloadAll();
        });
      },
    });
  }
  showGroup(group: Group<Shop>) {
    this.dialogs.push({ component: ShopGroupInfoComponent, data: group });
  }
}
