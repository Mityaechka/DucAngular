import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RetroBonusObligation } from 'src/app/entities/retro-bonus/retro-bonus-obligation.entity';
import { EnumDisplayCollection, EnumCollection } from 'src/app/enums/enum-display.collection';
import { RetroBonusTypeEnum } from 'src/app/enums/retro-bonus-type.enum';
import { sumFunction } from 'src/app/other/resolve-fn';
import { DialogsService } from 'src/app/services/dialogs.service';
import { RetroBonusObligationService } from 'src/app/services/retro-bonus-obligation.service';

@Component({
  selector: 'app-retro-bonus-obligations-receiver-info',
  templateUrl: './retro-bonus-obligations-receiver-info.component.html',
  styleUrls: ['./retro-bonus-obligations-receiver-info.component.css'],
})
export class RetroBonusObligationsReceiverInfoComponent implements OnInit {
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
    const response = await this.retroBonusObligationService.getReceiverObligation(
      this.retroBonusObligation.id
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.retroBonusObligation = response.result;
    }
    this.detector.markForCheck();
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
