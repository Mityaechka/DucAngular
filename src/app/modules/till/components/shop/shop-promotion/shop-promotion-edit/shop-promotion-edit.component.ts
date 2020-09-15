import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  ActiveCondition,
  ActiveConditionDisplay,
} from 'src/app/enums/active-condition.enum';
import {
  PromotionType,
  PromotionTypeDisplay,
} from 'src/app/enums/promotion-type.enum';
import {
  PurposeType,
  PurposeTypeDisplay,
} from 'src/app/enums/purpose-type.enum';
import { DialogsService } from 'src/app/services/dialogs.service';
import { LeftsService } from 'src/app/services/lefts.service';
import { ShopsService } from 'src/app/services/shops.service';
import { ShopLeftSelectComponent } from '../../shop-left/shop-left-select/shop-left-select.component';
import { Promotion } from 'src/app/entities/promotion.entity';

@Component({
  selector: 'app-shop-promotion-edit',
  templateUrl: './shop-promotion-edit.component.html',
  styleUrls: ['./shop-promotion-edit.component.css'],
})
export class ShopPromotionEditComponent implements OnInit {
  @Output() edited = new EventEmitter();
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
    @Inject(MAT_DIALOG_DATA) public promotion: Promotion,
    private dialogs: DialogsService,
    private leftsService: LeftsService,
    private detector: ChangeDetectorRef,
    private shopsService: ShopsService
  ) {}

  async ngOnInit() {
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

    this.dialogs.startLoading();
    const response = await this.shopsService.getPromotion(this.promotion.id);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.promotion = response.result;
    }
    this.form.patchValue({
      purposeType: this.promotion.purposeType,
      activeCondition: this.promotion.activeCondition,
      activeDate: this.promotion.activeDate,
      activeCount: this.promotion.activeCount,
      productLeft: this.promotion.productLeft,
      productLeftId: this.promotion.productLeft.id,
      promotionType: this.promotion.promotionType,
      nPromotionSellCount: this.promotion.nPromotion?.sellCount,
      nPromotionNCount: this.promotion.nPromotion?.nCount,
      crossPromotionProductLeft: this.promotion.crossPromotion
        ?.crossProductLeft,
      crossPromotionProductLeftId: this.promotion.crossPromotion
        ?.crossProductLeft?.id,
      crossPromotionSellCount: this.promotion.crossPromotion?.sellCount,
      crossPromotionCrossCount: this.promotion.crossPromotion?.crossCount,
    });
    this.detector.markForCheck();
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
  async edit() {
    this.dialogs.startLoading();
    const response = await this.shopsService.editPromotion(this.promotion.id,
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.edited.emit();
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
