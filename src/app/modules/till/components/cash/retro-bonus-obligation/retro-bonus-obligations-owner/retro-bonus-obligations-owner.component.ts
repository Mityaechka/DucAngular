import { RetroBonusObligationOwnerInfoComponent } from './../retro-bonus-obligation-owner-info/retro-bonus-obligation-owner-info.component';
import { RetroBonusObligation } from './../../../../../../entities/retro-bonus/retro-bonus-obligation.entity';
import { EnumDisplayCollection } from './../../../../../../enums/enum-display.collection';
import { Component, OnInit } from '@angular/core';
import { DialogsService } from 'src/app/services/dialogs.service';
import { RetroBonusObligationService } from 'src/app/services/retro-bonus-obligation.service';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-retro-bonus-obligations-owner',
  templateUrl: './retro-bonus-obligations-owner.component.html',
  styleUrls: ['./retro-bonus-obligations-owner.component.css'],
})
export class RetroBonusObligationsOwnerComponent implements OnInit {
  EnumDisplayCollection = EnumDisplayCollection;
  constructor(
    private retroBonusObligationService: RetroBonusObligationService,
    private dialogs: DialogsService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {}
  async loadData() {
    return await this.retroBonusObligationService.getOwnerObligations();
  }
  ownerInfo(obligation: RetroBonusObligation) {
    this.dialogs.push({
      component: RetroBonusObligationOwnerInfoComponent,
      data: obligation,
    });
  }
}
