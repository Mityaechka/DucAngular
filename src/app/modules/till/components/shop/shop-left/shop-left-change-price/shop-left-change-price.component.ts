import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { inherits } from 'util';
import { ProductLeft } from 'src/app/entities/product-left.entity';
import { DialogsService } from 'src/app/services/dialogs.service';
import { LeftsService } from 'src/app/services/lefts.service';

@Component({
  selector: 'app-shop-left-change-price',
  templateUrl: './shop-left-change-price.component.html',
  styleUrls: ['./shop-left-change-price.component.css'],
})
export class ShopLeftChangePriceComponent implements OnInit {
  @Output() priceChange = new EventEmitter();
  markup: FormControl;
  constructor(
    @Inject(MAT_DIALOG_DATA) public productLeft: ProductLeft,
    private dialogs: DialogsService,
    private leftsService: LeftsService
  ) {}

  ngOnInit(): void {
    this.markup = new FormControl(this.productLeft.markup, [
      Validators.min(0),
      Validators.required
    ]);
  }
  async changePrice() {
    this.dialogs.startLoading();
    const response = await this.leftsService.changePrice(
      this.productLeft.id,
      this.markup.value
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
