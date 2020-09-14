
import { ShopProductInfoComponent } from './../shop-product-info/shop-product-info.component';
import { ShopProductCreateComponent } from './../shop-product-create/shop-product-create.component';
import { Component, OnInit } from '@angular/core';
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
      config: { width: '600px' },
    });
  }
  productArriving(product: Product) {
    this.dialogs.push({
      component: ShopProductArrivingComponent,
      config: { width: '500px' },
      data: product,
    });
  }
  productInfo(product: Product) {
    this.dialogs.push({
      component: ShopProductInfoComponent,
      config: { width: '500px' },
      data: product,
      onInstance: (i) => {
        i.edited.subscribe(() =>
          this.tableService.tables.forEach((x) => x.table.loadDataEvent())
        );
      },
    });
  }
}
