import { EnumDisplayCollection } from './../../../../../../enums/enum-display.collection';
import { ShopProductEditComponent } from './../shop-product-edit/shop-product-edit.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from 'src/app/services/products.service';
import {
  Component,
  Inject,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Product } from 'src/app/entities/product';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'app-shop-product-info',
  templateUrl: './shop-product-info.component.html',
  styleUrls: ['./shop-product-info.component.css'],
})
export class ShopProductInfoComponent implements OnInit {
  EnumDisplayCollection = EnumDisplayCollection;
  @Output() edited = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private productsService: ProductsService,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.reload();
  }
  async reload() {
    this.dialogs.startLoading();
    const response = await this.productsService.getProduct(this.product.id);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.product = Object.assign(new Product(), response.result);
    }
    this.detector.detectChanges();
  }
  editProduct() {
    this.dialogs.push({
      component: ShopProductEditComponent,
      data: this.product,
      onInstance: (i) => {
        i.edited.subscribe(async () => {
          this.reload();
          this.edited.emit();
        });
      },
    });
  }
  async loadParametrs() {
    return await this.productsService.getProductParametrs(this.product.id);
  }
}
