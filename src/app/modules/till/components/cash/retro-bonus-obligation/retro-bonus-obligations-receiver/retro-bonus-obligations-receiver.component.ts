import { Component, OnInit } from '@angular/core';
import { RetroBonusObligation } from 'src/app/entities/retro-bonus/retro-bonus-obligation.entity';
import { EnumDisplayCollection } from 'src/app/enums/enum-display.collection';
import { DialogsService } from 'src/app/services/dialogs.service';
import { RetroBonusObligationService } from 'src/app/services/retro-bonus-obligation.service';
import { TableService } from 'src/app/services/table.service';
import { RetroBonusObligationOwnerInfoComponent } from '../retro-bonus-obligation-owner-info/retro-bonus-obligation-owner-info.component';
import { RetroBonusObligationsReceiverInfoComponent } from '../retro-bonus-obligations-receiver-info/retro-bonus-obligations-receiver-info.component';

@Component({
  selector: 'app-retro-bonus-obligations-receiver',
  templateUrl: './retro-bonus-obligations-receiver.component.html',
  styleUrls: ['./retro-bonus-obligations-receiver.component.css'],
})
export class RetroBonusObligationsReceiverComponent implements OnInit {
  EnumDisplayCollection = EnumDisplayCollection;
  constructor(
    private retroBonusObligationService: RetroBonusObligationService,
    private dialogs: DialogsService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {}
  async loadData() {
    return await this.retroBonusObligationService.getReceiverObligations();
  }
  ownerInfo(obligation: RetroBonusObligation) {
    this.dialogs.push({
      component: RetroBonusObligationsReceiverInfoComponent,
      data: obligation,
    });
  }
}
