import { ShopsService } from 'src/app/services/shops.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cash-periods',
  templateUrl: './cash-periods.component.html',
  styleUrls: ['./cash-periods.component.css'],
})
export class CashPeriodsComponent implements OnInit {
  constructor(private shopsService: ShopsService) {}

  ngOnInit(): void {}
  async loadData() {
    return await this.shopsService.getCashPeriods();
  }
}
