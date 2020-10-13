import { sumFunction } from 'src/app/other/resolve-fn';
import { tillRoutes } from './../../../../till-routing.module';
import {
  EnumDisplayCollection,
  EnumCollection,
} from './../../../../../../enums/enum-display.collection';
import { RetroBonusObligation } from './../../../../../../entities/retro-bonus/retro-bonus-obligation.entity';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RetroBonusObligationService } from './../../../../../../services/retro-bonus-obligation.service';
import { DialogsService } from './../../../../../../services/dialogs.service';
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { RetroBonusTypeEnum } from 'src/app/enums/retro-bonus-type.enum';

@Component({
  selector: 'app-retro-bonus-obligation-owner-info',
  templateUrl: './retro-bonus-obligation-owner-info.component.html',
  styleUrls: ['./retro-bonus-obligation-owner-info.component.css'],
})
export class RetroBonusObligationOwnerInfoComponent implements OnInit {
  EnumDisplayCollection = EnumDisplayCollection;
  EnumCollection = EnumCollection;
  constructor(
    @Inject(MAT_DIALOG_DATA) public retroBonusObligation: RetroBonusObligation,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef,
    private retroBonusObligationService: RetroBonusObligationService
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const response = await this.retroBonusObligationService.getOwnerObligation(
      this.retroBonusObligation.id
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.retroBonusObligation = response.result;
    }
    this.detector.markForCheck();
  }
  createTransfer() {
    this.dialogs.pushConfirm(
      'Создание денежного обязательства',
      'Будет содано обязательство для этого остатка. Продолжить?',
      async () => {
        this.dialogs.startLoading();
        const response = await this.retroBonusObligationService.createMoneyTransfer(
          this.retroBonusObligation.productLeft.id
        );
        this.dialogs.stopLoading();
        if (response.isSuccess) {
          this.dialogs.pushAlert('Денежое обязательство успешно создано');
        } else {
          this.dialogs.pushAlert(response.errorMessage);
        }
      }
    );
  }

  get countTotal() {
    let count = 0;
    this.retroBonusObligation.obligationHistories.reduce((prev, curr) => {
      count += curr.count;
      return undefined;
    }, 0);
    return count;
  }

  get sumCurrent() {
    switch (this.retroBonusObligation.retroBonusType.type) {
      case RetroBonusTypeEnum.sellIn:
        const sellIn = this.retroBonusObligation.retroBonusType.sellIn;
        return this.countTotal >= sellIn.from && this.countTotal < sellIn.to
          ? sumFunction(
              this.retroBonusObligation.obligationHistories.filter(
                (x) => !x.isUsed
              ),
              (x) => x.count * x.price
            )
          : 0;
      case RetroBonusTypeEnum.sellOut:
        const sellOut = this.retroBonusObligation.retroBonusType.sellOut;
        return this.countTotal >= sellOut.from && this.countTotal < sellOut.to
          ? sumFunction(
              this.retroBonusObligation.obligationHistories.filter(
                (x) => !x.isUsed
              ),
              (x) => x.count * x.price
            )
          : 0;
    }
  }

  get sumTotal() {
    switch (this.retroBonusObligation.retroBonusType.type) {
      case RetroBonusTypeEnum.sellIn:
        const sellIn = this.retroBonusObligation.retroBonusType.sellIn;
        return this.countTotal >= sellIn.from && this.countTotal < sellIn.to
          ? sumFunction(
              this.retroBonusObligation.obligationHistories,
              (x) => x.count * x.price
            )
          : 0;
      case RetroBonusTypeEnum.sellOut:
        const sellOut = this.retroBonusObligation.retroBonusType.sellOut;
        return this.countTotal >= sellOut.from && this.countTotal < sellOut.to
          ? sumFunction(
              this.retroBonusObligation.obligationHistories,
              (x) => x.count * x.price
            )
          : 0;
    }
  }
  get sumCurrentForRetrun() {
    switch (this.retroBonusObligation.retroBonusType.type) {
      case RetroBonusTypeEnum.sellIn:
        return (
          this.sumCurrent *
          (this.retroBonusObligation.retroBonusType.sellIn.value / 100)
        );
        case RetroBonusTypeEnum.sellOut:
        return (
          this.sumCurrent *
          (this.retroBonusObligation.retroBonusType.sellOut.value / 100)
        );
    }
  }
  get sumTotalForRetrun() {
    switch (this.retroBonusObligation.retroBonusType.type) {
      case RetroBonusTypeEnum.sellIn:
        return (
          this.sumTotal *
          (this.retroBonusObligation.retroBonusType.sellIn.value / 100)
        );
        case RetroBonusTypeEnum.sellOut:
        return (
          this.sumTotal *
          (this.retroBonusObligation.retroBonusType.sellOut.value / 100)
        );
    }
  }
}
