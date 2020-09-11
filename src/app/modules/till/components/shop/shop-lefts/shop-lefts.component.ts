import { ShopLeftInfoComponent } from './../shop-left-info/shop-left-info.component';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProductLeft } from 'src/app/entities/product-left.entity';
import { LeftsService } from 'src/app/services/lefts.service';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'app-shop-lefts',
  templateUrl: './shop-lefts.component.html',
  styleUrls: ['./shop-lefts.component.css'],
})
export class ShopLeftsComponent implements OnInit {
  displayedColumns: string[] = ['product', 'type', 'price', 'count'];
  constructor(
    private leftsService: LeftsService,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {}
  async loadData() {
    return this.leftsService.getProductsLefts();
  }
  showInfo(left: ProductLeft) {
    this.dialogs.push({ component: ShopLeftInfoComponent, data: left });
  }
}
