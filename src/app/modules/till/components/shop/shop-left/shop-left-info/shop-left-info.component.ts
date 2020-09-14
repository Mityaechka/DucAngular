import { ShopLeftChangePriceComponent } from './../shop-left-change-price/shop-left-change-price.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { ProductLeft } from 'src/app/entities/product-left.entity';
import { DialogsService } from 'src/app/services/dialogs.service';
import { LeftsService } from 'src/app/services/lefts.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-shop-left-info',
  templateUrl: './shop-left-info.component.html',
  styleUrls: ['./shop-left-info.component.css'],
})
export class ShopLeftInfoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public productLeft: ProductLeft,
    private dialogs: DialogsService,
    private leftsService: LeftsService,
    private detector: ChangeDetectorRef,
    private tables: TableService
  ) {}

  async ngOnInit() {
    await this.loadData();
  }
  async reload() {
    await this.loadData();
    this.tables.tables.forEach(async (x) => await x.table.loadDataEvent());
  }
  async loadData() {
    this.dialogs.startLoading();
    const response = await this.leftsService.getProductsLeft(
      this.productLeft.id
    );
    this.dialogs.stopLoading();

    if (response.isSuccess) {
      this.productLeft = response.result;
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
    this.detector.detectChanges();
  }
  changePrice() {
    this.dialogs.push({
      component: ShopLeftChangePriceComponent,
      data: this.productLeft,
      onInstance: (i) => {
        i.priceChange.subscribe(async (x) => await this.reload());
      },
    });
  }
}
