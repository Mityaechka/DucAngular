import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { ProductLeft } from 'src/app/entities/product-left.entity';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'app-shop-left-sell',
  templateUrl: './shop-left-sell.component.html',
  styleUrls: ['./shop-left-sell.component.css'],
})
export class ShopLeftSellComponent implements OnInit {
  @Output() sellProduct = new EventEmitter<{
    count: number;
    product: ProductLeft;
  }>();
  count = 0;
  get canSell() {
    return this.count !== 0;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public productLeft: ProductLeft,
    private dialogs: DialogsService
  ) {}

  ngOnInit(): void {}

  getCount(count: number) {
    // if (count > this.productLeft.currentLeft) {
    //   count = this.productLeft.currentLeft;
    // }
    this.count = count;
  }
  sellProductClick() {
    this.sellProduct.emit({ count: this.count, product: this.productLeft });
    this.dialogs.pop();
  }
}
