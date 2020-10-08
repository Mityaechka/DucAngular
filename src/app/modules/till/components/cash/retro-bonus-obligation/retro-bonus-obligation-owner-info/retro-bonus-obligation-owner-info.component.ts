import {
  EnumDisplayCollection,
  EnumCollection,
} from './../../../../../../enums/enum-display.collection';
import { RetroBonusObligation } from './../../../../../../entities/retro-bonus/retro-bonus-obligation.entity';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RetroBonusObligationService } from './../../../../../../services/retro-bonus-obligation.service';
import { DialogsService } from './../../../../../../services/dialogs.service';
import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';

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

  get count() {
    let count = 0;
    this.retroBonusObligation.obligationHistories.reduce((prev, curr) => {
      count += curr.count;
      return undefined;
    }, 0);
    return count;
  }
  get sum() {
    if (
      this.count >= this.retroBonusObligation.retroBonusType.sellIn.from &&
      this.count < this.retroBonusObligation.retroBonusType.sellIn.to
    ) {
      let sum = 0;
      this.retroBonusObligation.obligationHistories.reduce(
        (prev, curr) => (sum += curr.count * curr.price),
        0
      );

      return sum;
    } else {
      return 0;
    }
  }
}
