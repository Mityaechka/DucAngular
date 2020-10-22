import { ShopPromotionInfoComponent } from './../shop-promotion-info/shop-promotion-info.component';
import { PromotionTypeDisplay } from './../../../../../../enums/promotion-type.enum';
import { ShopPromotionCreateComponent } from './../shop-promotion-create/shop-promotion-create.component';
import { ShopsService } from 'src/app/services/shops.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/entities/product';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ProductsService } from 'src/app/services/products.service';
import { TableService } from 'src/app/services/table.service';
import { ShopProductArrivingComponent } from '../../shop-product/shop-product-arriving/shop-product-arriving.component';
import { ShopProductCreateComponent } from '../../shop-product/shop-product-create/shop-product-create.component';
import { ShopProductInfoComponent } from '../../shop-product/shop-product-info/shop-product-info.component';

@Component({
  selector: 'app-shop-promotions',
  templateUrl: './shop-promotions.component.html',
  styleUrls: ['./shop-promotions.component.css'],
})
export class ShopPromotionsComponent implements OnInit {
  PromotionTypeDisplay = PromotionTypeDisplay;
  constructor(
    private shopsService: ShopsService,
    private dialogs: DialogsService,
    private tableService: TableService
  ) {}

  async ngOnInit() {}
  async loadData() {
    return this.shopsService.getPromotions();
  }
  createProduct() {
    this.dialogs.push({
      component: ShopPromotionCreateComponent,
      config: { width: '600px' },
      onInstance: (i) => {
        i.created.subscribe(() => {
          this.tableService.tables.forEach((x) => x.table.loadData());
        });
      },
    });
  }
  promotionInfo(product: Product) {
    this.dialogs.push({
      component: ShopPromotionInfoComponent,
      config: { width: '500px' },
      data: product,
      onInstance: (i) => {
        i.edited.subscribe(() =>
          this.tableService.tables.forEach((x) => x.table.loadData())
        );
      },
    });
  }
}
