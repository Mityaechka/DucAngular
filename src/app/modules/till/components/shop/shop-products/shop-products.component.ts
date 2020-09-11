import { ProductsService } from './../../../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.css']
})
export class ShopProductsComponent implements OnInit {

  displayedColumns: string[] = ['product', 'type', 'price'];
  constructor(
    private productsService: ProductsService,
    private dialogs: DialogsService
  ) {}

  async ngOnInit() {}
  async loadData() {
    return this.productsService.getProducts();
  }

}
