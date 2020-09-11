import { TableComponent } from './../../../../table/table/table.component';


import { ShopLeftSellComponent } from '../shop-left-sell/shop-left-sell.component';
import { ProductLeft } from '../../../../../entities/product-left.entity';
import { LeftsService } from '../../../../../services/lefts.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ProductRequest } from 'src/app/entities/product-request.entity';
import { SellerRequestInfoComponent } from '../../seller/seller-request-info/seller-request-info.component';

@Component({
  selector: 'app-shop-lefts',
  templateUrl: './shop-lefts-sell.component.html',
  styleUrls: ['./shop-lefts-sell.component.css'],
})
export class ShopLeftsSellComponent implements OnInit {
  displayedColumns: string[] = ['product', 'type', 'price', 'count'];
  sellProductsColumn: string[] = ['name', 'count', 'price', 'cost', 'remove'];
  products: { count: number; product: ProductLeft }[] = [];

  get total() {
    let sum = 0;
    this.products.forEach((x) => (sum += x.count * x.product.myShopPrice));
    return sum;
  }

  @ViewChild('productLeftsTable') productLeftsTable: TableComponent<any>;
  constructor(
    private leftsService: LeftsService,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {}
  async loadData() {
    return this.leftsService.getProductsLefts();
  }
  async sellProductClick(left: ProductLeft) {
    this.dialogs.startLoading();
    const response = await this.leftsService.getProductsLeft(left.id);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.dialogs.push({
        component: ShopLeftSellComponent,
        data: response.result,
        onInstance: (instance) => {
          instance.sellProduct.subscribe(
            (data: { count: number; product: ProductLeft }) =>
              this.addProduct(data)
          );
        },
      });
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
  addProduct(data: { count: number; product: ProductLeft }) {
    this.products = this.products.concat([data]);
    this.detector.detectChanges();
  }
  removeProduct(product) {
    this.products = this.products.filter((x) => x !== product);
  }
  async sellProducts() {
    this.dialogs.startLoading();
    const response = await this.leftsService.sellProducts(
      this.products.map((x) => {
        return { id: x.product.id, count: x.count };
      })
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.products = [];
      this.dialogs.pushAlert('Товары успешно проданы!', 'Сообщение');
      await this.productLeftsTable.loadDataEvent();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
    this.detector.detectChanges();
  }
}
