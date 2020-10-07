import { RetroBonusTypeEnum } from './../../../../../../enums/retro-bonus-type.enum';
import { RetroBonusType } from './../../../../../../entities/retro-bonus/retro-bonus.entity';
import { EnumDisplayCollection, EnumCollection } from './../../../../../../enums/enum-display.collection';
import { EventEmitter, Output } from '@angular/core';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DirectDiscount } from 'src/app/entities/direct-discount.entity';
import { RetroBonus } from 'src/app/entities/retro-bonus/retro-bonus.entity';
import { DialogsService } from 'src/app/services/dialogs.service';
import { RetroBonusService } from 'src/app/services/retro-bonus.service';

@Component({
  selector: 'app-retro-bonus-info',
  templateUrl: './retro-bonus-info.component.html',
  styleUrls: ['./retro-bonus-info.component.css'],
})
export class RetroBonusInfoComponent implements OnInit {
  EnumDisplayCollection = EnumDisplayCollection;
  EnumCollection = EnumCollection;

  @Output() edited = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public bonus: RetroBonus,
    private dialogs: DialogsService,
    private retroBonusService: RetroBonusService,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.load();
  }
  async load() {
    this.dialogs.startLoading();
    const response = await this.retroBonusService.getRetroBonus(this.bonus.id);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.bonus = response.result;
    }
    this.detector.detectChanges();
  }
  edit() {
    // this.dialogs.push({
    //   component: DirectDiscountEditComponent,
    //   data: this.bonus,
    //   onInstance: (i) => {
    //     i.edited.subscribe(() => {
    //       this.edited.emit();
    //       this.load();
    //     });
    //   },
    // });
  }
}
