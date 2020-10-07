import { RetroBonusInfoComponent } from './../retro-bonus-info/retro-bonus-info.component';
import { RetroBonusService } from './../../../../../../services/retro-bonus.service';
import { RetroBonusCreateComponent } from './../retro-bonus-create/retro-bonus-create.component';
import { DialogsService } from './../../../../../../services/dialogs.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DirectDiscount } from 'src/app/entities/direct-discount.entity';
import { TableComponent } from 'src/app/modules/table/table/table.component';
import { DirectDiscountsService } from 'src/app/services/direct-discounts.service';
import { DirectDiscountCreateComponent } from '../../direct-discounts/direct-discount-create/direct-discount-create.component';
import { DirectDiscountInfoComponent } from '../../direct-discounts/direct-discount-info/direct-discount-info.component';
import { RetroBonus } from 'src/app/entities/retro-bonus/retro-bonus.entity';

@Component({
  selector: 'app-retro-bonuses',
  templateUrl: './retro-bonuses.component.html',
  styleUrls: ['./retro-bonuses.component.css'],
})
export class RetroBonusesComponent implements OnInit {
  @ViewChild('table')
  table: TableComponent<DirectDiscount>;
  constructor(
    private dialogs: DialogsService,
    private retroBonusService: RetroBonusService
  ) {}

  ngOnInit(): void {}
  createDiscount() {
    this.dialogs.push({
      component: RetroBonusCreateComponent,
      onInstance: (i) => {
        i.created.subscribe(() => {
          this.table.loadDataEvent();
        });
      },
    });
  }
  async loadData() {
    return await this.retroBonusService.getRetroBonuses();
  }
  async selectRetrobonus(bonus: RetroBonus) {
    this.dialogs.push({
      component: RetroBonusInfoComponent,
      data: bonus,
      onInstance: (i) => {
        i.edited.subscribe(() => this.table.loadDataEvent());
      },
    });
  }
  async changeStateDirectDiscount(id: number, state: boolean) {
    // this.dialogs.startLoading();
    // const response = await this.retroBonusService.changeStateDirectDiscount(
    //   id,
    //   state
    // );
    // this.dialogs.stopLoading();
    // if (response.isSuccess) {
    //   this.table.loadDataEvent();
    // } else {
    //   this.dialogs.pushAlert(response.errorMessage);
    // }
  }
}
