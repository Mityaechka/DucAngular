import { ShopGroupsService } from './../../../../../../services/shop-groups.service';
import { DialogsService } from './../../../../../../services/dialogs.service';
import { DialogData } from './../../../../../../models/dialog-data.model';
import { Group } from './../../../../../../entities/group.entity';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  Inject,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { Shop } from 'src/app/entities/shop.entity';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shop-group-info',
  templateUrl: './shop-group-info.component.html',
  styleUrls: ['./shop-group-info.component.css'],
})
export class ShopGroupInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public shopGroup: Group<Shop>,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef,
    private shopGroupsService: ShopGroupsService
  ) {}
  async ngOnInit(){
    this.dialogs.startLoading();
    const response = await this.shopGroupsService.getGroup(this.shopGroup.id);
    this.dialogs.stopLoading();
    if(response.isSuccess){
      this.shopGroup = response.result;
    }
    this.detector.detectChanges();
  }

}
