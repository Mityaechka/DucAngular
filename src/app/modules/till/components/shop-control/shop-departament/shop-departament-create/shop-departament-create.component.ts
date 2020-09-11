import { ShopsService } from 'src/app/services/shops.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  ShopType,
  ShopTypeDisplay,
} from './../../../../../../enums/shop-type.enum';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shop-departament-create',
  templateUrl: './shop-departament-create.component.html',
  styleUrls: ['./shop-departament-create.component.css'],
})
export class ShopDepartamentCreateComponent implements OnInit {
  ShopType = ShopType;
  ShopTypeDisplay = ShopTypeDisplay;
  @Output() created = new EventEmitter();
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    adress: new FormControl('', [Validators.required]),
    shopType: new FormControl('', [Validators.required]),
  });
  constructor(
    private dialogs: DialogsService,
    private shopsService: ShopsService
  ) {}

  ngOnInit(): void {}
  async createShop() {
    this.dialogs.startLoading();
    const response = await this.shopsService.createShopDepartament(
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.created.emit();
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
