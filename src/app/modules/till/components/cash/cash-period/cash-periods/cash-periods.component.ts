import { CashPeriodInfoComponent } from './../cash-period-info/cash-period-info.component';
import { DialogsService } from './../../../../../../services/dialogs.service';
import { CashPeriod } from 'src/app/entities/cash-period.entity';
import { ShopsService } from 'src/app/services/shops.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-periods',
  templateUrl: './cash-periods.component.html',
  styleUrls: ['./cash-periods.component.css'],
})
export class CashPeriodsComponent implements OnInit {
  constructor(
    private shopsService: ShopsService,
    private dialogs: DialogsService
  ) {}

  ngOnInit(): void {}
  async loadData() {
    return await this.shopsService.getCashPeriods();
  }
  showPeriod(cashPeriod: CashPeriod) {
    this.dialogs.push({ component: CashPeriodInfoComponent, data: cashPeriod });
  }
}
