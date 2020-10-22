import { SnackBarService } from './../../../../../../services/snack-bar.service';
import { ScannerService } from './../../../../../../services/scanner.service';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ProductLeft } from 'src/app/entities/product-left.entity';
import { TableComponent } from 'src/app/modules/table/table/table.component';
import { DialogsService } from 'src/app/services/dialogs.service';
import { LeftsService } from 'src/app/services/lefts.service';
import { ShopLeftSellComponent } from '../shop-left-sell/shop-left-sell.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shop-lefts',
  templateUrl: './shop-lefts-sell.component.html',
  styleUrls: ['./shop-lefts-sell.component.css'],
})
export class ShopLeftsSellComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['product', 'type', 'price', 'count'];
  sellProductsColumn: string[] = ['name', 'count', 'price', 'cost', 'remove'];
  products: { count: number; product: ProductLeft }[] = [];

  scanSubscription: Subscription;
  get total() {
    let sum = 0;
    this.products.forEach((x) => (sum += x.count * x.product.retailPrice));
    return sum;
  }

  @ViewChild('productLeftsTable') productLeftsTable: TableComponent<any>;
  constructor(
    private leftsService: LeftsService,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef,
    private scannerService: ScannerService,
    private snackBarService: SnackBarService
  ) {}
  ngOnDestroy(): void {
    if (this.scanSubscription) {
      this.scanSubscription.unsubscribe();
    }
  }

  async ngOnInit() {
    this.scanSubscription = this.scannerService.subscribeScanEvent(
      (barcode: string) => {
        this.onScanBarcode(barcode);
      }
    );
  }
  async loadData() {
    return this.leftsService.getProductsLefts();
  }
  async sellProductClick(left: ProductLeft) {
    this.dialogs.push({
      component: ShopLeftSellComponent,
      data: left,
      onInstance: (instance) => {
        instance.sellProduct.subscribe(
          (data: { count: number; product: ProductLeft }) =>
            this.addProduct(data)
        );
      },
    });
  }
  addProduct(data: { count: number; product: ProductLeft }) {
    this.products = this.products.concat([data]);
    this.detector.detectChanges();
  }
  removeProduct(product) {
    this.products = this.products.filter((x) => x !== product);
  }
  async sellProducts() {
    this.dialogs.startLoading();
    const response = await this.leftsService.sellProducts(
      this.products.map((x) => {
        return { id: x.product.id, count: x.count };
      })
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.products = [];
      this.snackBarService.open('Сообщение', 'Товары успешно проданы');
      await this.productLeftsTable.loadData();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
    this.detector.detectChanges();
  }

  async onScanBarcode(barcode: string) {
    this.dialogs.popAll();
    this.dialogs.startLoading();
    const response = await this.leftsService.getProductsLeftByBarcode(barcode);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.sellProductClick(response.result);
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
