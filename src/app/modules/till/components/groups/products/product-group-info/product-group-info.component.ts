import { Product } from './../../../../../../entities/product';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Group } from 'src/app/entities/group.entity';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ProductGroupsService } from 'src/app/services/product-groups.service';

@Component({
  selector: 'app-product-group-info',
  templateUrl: './product-group-info.component.html',
  styleUrls: ['./product-group-info.component.css']
})
export class ProductGroupInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public productGroup: Group<Product>,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef,
    private productGroupsService: ProductGroupsService
  ) {}
  async ngOnInit(){
    this.dialogs.startLoading();
    const response = await this.productGroupsService.getGroup(this.productGroup.id);
    this.dialogs.stopLoading();
    if(response.isSuccess){
      this.productGroup = response.result;
    }
    this.detector.detectChanges();
  }

}
