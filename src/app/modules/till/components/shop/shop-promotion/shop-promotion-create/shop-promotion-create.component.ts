import { ShopsService } from './../../../../../../services/shops.service';
import {
  PromotionType,
  PromotionTypeDisplay,
} from './../../../../../../enums/promotion-type.enum';
import { LeftsService } from './../../../../../../services/lefts.service';
import { ShopLeftSelectComponent } from './../../shop-left/shop-left-select/shop-left-select.component';
import { DialogsService } from './../../../../../../services/dialogs.service';
import {
  PurposeType,
  PurposeTypeDisplay,
} from './../../../../../../enums/purpose-type.enum';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
} from '@angular/core';
import {
  ActiveCondition,
  ActiveConditionDisplay,
} from 'src/app/enums/active-condition.enum';

@Component({
  selector: 'app-shop-promotion-create',
  templateUrl: './shop-promotion-create.component.html',
  styleUrls: ['./shop-promotion-create.component.css'],
})
export class ShopPromotionCreateComponent implements OnInit {
  created = new EventEmitter();
  form = new FormGroup({
    purposeType: new FormControl(0, [Validators.required]),
    activeCondition: new FormControl(0, [Validators.required]),
    activeDate: new FormControl(null, [Validators.required]),
    activeCount: new FormControl(0, [Validators.required]),
    productLeft: new FormControl(null, [Validators.required]),
    productLeftId: new FormControl(null, [Validators.required]),
    promotionType: new FormControl(0, [Validators.required]),
    nPromotionSellCount: new FormControl(0, [Validators.required]),
    nPromotionNCount: new FormControl(0, [Validators.required]),
    crossPromotionProductLeft: new FormControl(null, [Validators.required]),
    crossPromotionProductLeftId: new FormControl(null, [Validators.required]),
    crossPromotionSellCount: new FormControl(null, [Validators.required]),
    crossPromotionCrossCount: new FormControl(null, [Validators.required]),
  });
  get activeCondition() {
    return this.form.controls.activeCondition as FormControl;
  }
  get activeDate() {
    return this.form.controls.activeDate as FormControl;
  }
  get activeCount() {
    return this.form.controls.activeCount as FormControl;
  }
  get productLeft() {
    return this.form.controls.productLeft as FormControl;
  }
  get productLeftId() {
    return this.form.controls.productLeftId as FormControl;
  }
  get promotionType() {
    return this.form.controls.promotionType as FormControl;
  }
  get nPromotionSellCount() {
    return this.form.controls.nPromotionSellCount as FormControl;
  }
  get nPromotionNCount() {
    return this.form.controls.nPromotionNCount as FormControl;
  }
  get crossPromotionProductLeft() {
    return this.form.controls.crossPromotionProductLeft as FormControl;
  }
  get crossPromotionProductLeftId() {
    return this.form.controls.crossPromotionProductLeftId as FormControl;
  }
  get crossPromotionSellCount() {
    return this.form.controls.crossPromotionSellCount as FormControl;
  }
  get crossPromotionCrossCount() {
    return this.form.controls.crossPromotionCrossCount as FormControl;
  }

  PurposeType = PurposeType;
  PurposeTypeDisplay = PurposeTypeDisplay;
  ActiveCondition = ActiveCondition;
  ActiveConditionDisaplay = ActiveConditionDisplay;
  PromotionType = PromotionType;
  PromotionTypeDisplay = PromotionTypeDisplay;

  constructor(
    private dialogs: DialogsService,
    private leftsService: LeftsService,
    private detector: ChangeDetectorRef,
    private shopsService: ShopsService
  ) {}

  ngOnInit(): void {
    this.activeCondition.valueChanges.subscribe((value) => {
      this.activeDate.clearValidators();
      this.activeCount.clearValidators();
      switch (value) {
        case ActiveCondition.Date:
          this.activeDate.setValidators([Validators.required]);
          break;
        case ActiveCondition.SoldCount:
          this.activeCount.setValidators([Validators.required]);
          break;
      }
      this.activeDate.updateValueAndValidity();
      this.activeCount.updateValueAndValidity();
    });
    this.promotionType.valueChanges.subscribe((value) => {
      this.nPromotionNCount.clearValidators();
      this.nPromotionSellCount.clearValidators();
      this.crossPromotionProductLeft.clearValidators();
      this.crossPromotionSellCount.clearValidators();
      this.crossPromotionCrossCount.clearValidators();

      switch (value) {
        case PromotionType.N:
          this.nPromotionNCount.setValidators([
            Validators.required,
            Validators.min(1),
          ]);
          this.nPromotionSellCount.setValidators([
            Validators.required,
            Validators.min(1),
          ]);
          break;
        case PromotionType.Cross:
          this.crossPromotionSellCount.setValidators([
            Validators.required,
            Validators.min(1),
          ]);
          this.crossPromotionCrossCount.setValidators([
            Validators.required,
            Validators.min(1),
          ]);
          this.crossPromotionProductLeft.setValidators([Validators.required]);
          break;
      }
      this.nPromotionNCount.updateValueAndValidity();
      this.nPromotionSellCount.updateValueAndValidity();
      this.crossPromotionProductLeft.updateValueAndValidity();
      this.crossPromotionSellCount.updateValueAndValidity();
      this.crossPromotionCrossCount.updateValueAndValidity();
    });
  }

  selectProductLeft() {
    this.dialogs.push({
      component: ShopLeftSelectComponent,
      onInstance: (i) => {
        i.selected.subscribe(async (id) => {
          this.dialogs.startLoading();
          const response = await this.leftsService.getProductsLeft(id);
          this.dialogs.stopLoading();
          if (response.isSuccess) {
            this.productLeft.patchValue(response.result);
            this.productLeftId.patchValue(response.result.id);
          }
          this.detector.markForCheck();
        });
      },
    });
  }
  selectCrossProductLeft() {
    this.dialogs.push({
      component: ShopLeftSelectComponent,
      onInstance: (i) => {
        i.selected.subscribe(async (id) => {
          this.dialogs.startLoading();
          const response = await this.leftsService.getProductsLeft(id);
          this.dialogs.stopLoading();
          if (response.isSuccess) {
            this.crossPromotionProductLeft.patchValue(response.result);
            this.crossPromotionProductLeftId.patchValue(response.result.id);
          }
          this.detector.markForCheck();
        });
      },
    });
  }
  async create() {
    this.dialogs.startLoading();
    const response = await this.shopsService.createPromotion(
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
