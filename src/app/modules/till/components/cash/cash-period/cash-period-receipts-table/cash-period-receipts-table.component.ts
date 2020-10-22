import { ShopsService } from 'src/app/services/shops.service';
import { Filter } from './../../../../../../models/filter.model';
import { Component, Input, OnInit } from '@angular/core';
import { Receipt } from 'src/app/entities/receipt.entity';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ReceiptInfoComponent } from '../../../receipts/receipt-info/receipt-info.component';

@Component({
  selector: 'app-cash-period-receipts-table',
  templateUrl: './cash-period-receipts-table.component.html',
  styleUrls: ['./cash-period-receipts-table.component.css'],
})
export class CashPeriodReceiptsTableComponent implements OnInit {
  @Input() cashPeriodId: number;
  constructor(
    private dialogs: DialogsService,
    private shopsService: ShopsService
  ) {}

  ngOnInit(): void {}
  async loadReceipts(filter: Filter) {
    return await this.shopsService.getCashPeriodReceipts(
      this.cashPeriodId,
      filter
    );
  }
  openReceipt(receipt: Receipt) {
    this.dialogs.push({ component: ReceiptInfoComponent, data: receipt });
  }
}
