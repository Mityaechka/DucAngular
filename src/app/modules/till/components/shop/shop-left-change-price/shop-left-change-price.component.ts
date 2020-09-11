import { FormControl, Validators } from '@angular/forms';
import { LeftsService } from './../../../../../services/lefts.service';
import { DialogsService } from './../../../../../services/dialogs.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductLeft } from '../../../../../entities/product-left.entity';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { inherits } from 'util';

@Component({
  selector: 'app-shop-left-change-price',
  templateUrl: './shop-left-change-price.component.html',
  styleUrls: ['./shop-left-change-price.component.css'],
})
export class ShopLeftChangePriceComponent implements OnInit {
  @Output() priceChange = new EventEmitter();
  price: FormControl;
  constructor(
    @Inject(MAT_DIALOG_DATA) public productLeft: ProductLeft,
    private dialogs: DialogsService,
    private leftsService: LeftsService
  ) {}

  ngOnInit(): void {
    this.price = new FormControl(this.productLeft.myShopPrice, [
      Validators.min(0),
      Validators.required
    ]);
  }
  async changePrice() {
    this.dialogs.startLoading();
    const response = await this.leftsService.changePrice(
      this.productLeft.id,
      this.price.value
    );
    this.dialogs.stopLoading();
    if(response.isSuccess){
      this.priceChange.emit();
      this.dialogs.pop();
    }else{
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
