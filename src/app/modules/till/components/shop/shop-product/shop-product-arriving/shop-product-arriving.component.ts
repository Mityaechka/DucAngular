import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { DialogsService } from '../../../../../../services/dialogs.service';
import { Product } from '../../../../../../entities/product';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  Inject,
  OnInit,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-shop-product-arriving',
  templateUrl: './shop-product-arriving.component.html',
  styleUrls: ['./shop-product-arriving.component.css'],
})
export class ShopProductArrivingComponent implements OnInit {
  @Output() arrived = new EventEmitter();
  form = new FormGroup({
    productId: new FormControl(-1),
    count: new FormControl('', [Validators.required, Validators.min(0)]),
    markup: new FormControl(0, [Validators.required]),
  });
  get count() {
    return this.form.controls.count.value;
  }
  get total() {
    return this.count * this.product.price;
  }
  get retailPrice() {
    return (
      this.product.price +
      this.product.price * (this.form.controls.markup.value / 100)
    );
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public product: Product,
    private dialogs: DialogsService,
    private productsService: ProductsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const response = await this.productsService.getProduct(this.product.id);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.product = Product.Assign(response.result);
    }
    this.form.patchValue({
      //price: this.product.retailPrice,
      markup: this.product.markup,
      productId: this.product.id,
    });
    this.detector.detectChanges();
  }
  async productArriving() {
    this.dialogs.startLoading();
    const response = await this.productsService.productArriving(
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.arrived.emit();
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
