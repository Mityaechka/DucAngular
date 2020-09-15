import { ShopPromotionEditComponent } from './../shop-promotion-edit/shop-promotion-edit.component';
import { ShopProductEditComponent } from './../../shop-product/shop-product-edit/shop-product-edit.component';
import { ActiveConditionDisplay } from './../../../../../../enums/active-condition.enum';
import {
  PurposeType,
  PurposeTypeDisplay,
} from './../../../../../../enums/purpose-type.enum';
import { ProductType } from './../../../../../../entities/product-type';
import {
  PromotionType,
  PromotionTypeDisplay,
} from './../../../../../../enums/promotion-type.enum';
import { ShopsService } from 'src/app/services/shops.service';
import { DialogsService } from './../../../../../../services/dialogs.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  Inject,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Promotion } from 'src/app/entities/promotion.entity';
import {
  EnumCollection,
  EnumDisplayCollection,
} from 'src/app/enums/enum-display.collection';

@Component({
  selector: 'app-shop-promotion-info',
  templateUrl: './shop-promotion-info.component.html',
  styleUrls: ['./shop-promotion-info.component.css'],
})
export class ShopPromotionInfoComponent implements OnInit {
  @Output() edited = new EventEmitter();
  EnumDisplayCollection = EnumDisplayCollection;
  EnumCollection = EnumCollection;
  constructor(
    @Inject(MAT_DIALOG_DATA) public promotion: Promotion,
    private dialogs: DialogsService,
    private shopsService: ShopsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.loadData();
  }
  async loadData(){
    this.dialogs.startLoading();
    const response = await this.shopsService.getPromotion(this.promotion.id);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.promotion = response.result;
    }
    this.detector.markForCheck();
  }
  edit() {
    this.dialogs.push({
      component: ShopPromotionEditComponent,
      data: this.promotion,
      onInstance: (i) => {
        i.edited.subscribe(() => {
          this.edited.emit();
          this.loadData();
        });
      },
    });
  }
}
