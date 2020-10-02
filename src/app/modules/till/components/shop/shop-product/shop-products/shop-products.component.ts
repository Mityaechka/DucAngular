import { TableComponent } from './../../../../../table/table/table.component';

import { ShopProductInfoComponent } from './../shop-product-info/shop-product-info.component';
import { ShopProductCreateComponent } from './../shop-product-create/shop-product-create.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ShopProductArrivingComponent } from '../shop-product-arriving/shop-product-arriving.component';
import { Product } from 'src/app/entities/product';
import { ProductsService } from 'src/app/services/products.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css'],
})
export class ShopProductsComponent implements OnInit {
  Product = Product;
  @ViewChild('table')
  productsTable: TableComponent<Product>;
  displayedColumns: string[] = ['product', 'type', 'price', 'action'];
  constructor(
    private productsService: ProductsService,
    private dialogs: DialogsService,
    private tableService: TableService
  ) {}

  async ngOnInit() {}
  async loadData() {
    return this.productsService.getProducts();
  }
  createProduct() {
    this.dialogs.push({
      component: ShopProductCreateComponent,
      onInstance: (i) => {
        i.created.subscribe(() => this.productsTable.loadDataEvent());
      },
    });
  }
  productArriving(product: Product) {
    this.dialogs.push({
      component: ShopProductArrivingComponent,
      data: product,
      onInstance: (i) => {
        i.created.subscribe(() => this.productsTable.loadDataEvent());
      },
    });
  }
  productInfo(product: Product) {
    this.dialogs.push({
      component: ShopProductInfoComponent,
      data: product,
      onInstance: (i) => {
        i.edited.subscribe(() => this.productsTable.loadDataEvent());
      },
    });
  }
}
