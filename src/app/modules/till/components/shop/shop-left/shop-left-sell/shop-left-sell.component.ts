import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ScannerService } from './../../../../../../services/scanner.service';
import { ShopsService } from 'src/app/services/shops.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { ProductLeft } from 'src/app/entities/product-left.entity';
import { DialogsService } from 'src/app/services/dialogs.service';
import { PurposeType } from 'src/app/enums/purpose-type.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop-left-sell',
  templateUrl: './shop-left-sell.component.html',
  styleUrls: ['./shop-left-sell.component.css'],
})
export class ShopLeftSellComponent implements OnInit, OnDestroy {
  @Output() sellProduct = new EventEmitter<{
    count: number;
    product: ProductLeft;
  }>();
  form = new FormGroup({
    count: new FormControl(1, [Validators.required, Validators.min(1)]),
  });

  scanSubscription: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public productLeft: ProductLeft,
    private dialogs: DialogsService,
    private shopsService: ShopsService,
    private scannerService: ScannerService
  ) {}
  ngOnDestroy(): void {
    if (this.scanSubscription) {
      this.scanSubscription.unsubscribe();
    }
  }

  async ngOnInit() {
    this.dialogs.startLoading();
    const purposeResponse = await this.shopsService.getPromotionsByPurpose(
      PurposeType.Shop,
      this.productLeft.id
    );
    this.dialogs.stopLoading();
    if (purposeResponse.isSuccess) {
    }
    this.scanSubscription = this.scannerService.subscribeScanEvent(
      (barcode: string) => {
        this.sellProductClick();
      }
    );
  }

  getCount(count: number) {
    // if (count > this.productLeft.currentLeft) {
    //   count = this.productLeft.currentLeft;
    // }
    this.form.patchValue({
      count,
    });
  }
  sellProductClick() {
    if (this.form.controls.count.value !== 0) {
      this.sellProduct.emit({ count: this.form.controls.count.value, product: this.productLeft });
    }
    this.dialogs.pop();
  }
}
