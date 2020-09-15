import { ProductLeft } from './../../../../../../entities/product-left.entity';
import { LeftsService } from './../../../../../../services/lefts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShopsService } from 'src/app/services/shops.service';
import { DialogsService } from './../../../../../../services/dialogs.service';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-shop-left-select',
  templateUrl: './shop-left-select.component.html',
  styleUrls: ['./shop-left-select.component.css'],
})
export class ShopLeftSelectComponent implements OnInit {
  productLefts: ProductLeft[] = [];
  form = new FormGroup({
    productLeft: new FormControl('', [Validators.required]),
  });
  @Output() selected = new EventEmitter<number>();
  constructor(
    private dialogs: DialogsService,
    private leftsService: LeftsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const response = await this.leftsService.getProductsLefts();
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.productLefts = response.result.list;
    }
    this.detector.detectChanges();
  }
  select() {
    this.selected.emit(this.form.controls.productLeft.value);
    this.dialogs.pop();
  }
}
