import { Filter } from './../../../../../../models/filter.model';
import { ReceiptInfoComponent } from './../../../receipts/receipt-info/receipt-info.component';
import { CashPeriodCollectCashComponent } from './../cash-period-collect-cash/cash-period-collect-cash.component';
import { CashPeriodOpenNewComponent } from './../cash-period-open-new/cash-period-open-new.component';
import { TableService } from './../../../../../../services/table.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ShopsService } from 'src/app/services/shops.service';
import { CashPeriod } from 'src/app/entities/cash-period.entity';
import { Receipt } from 'src/app/entities/receipt.entity';

@Component({
  selector: 'app-cash-period-current',
  templateUrl: './cash-period-current.component.html',
  styleUrls: ['./cash-period-current.component.css'],
})
export class CashPeriodCurrentComponent implements OnInit {
  cashPeriod: CashPeriod;
  receipts: Receipt[];
  isLoad = false;
  constructor(
    private dialogs: DialogsService,
    private shopsService: ShopsService,
    private detector: ChangeDetectorRef,
    private tableService: TableService
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const response = await this.shopsService.getCurrentPeriod();
    this.isLoad = true;
    this.dialogs.stopLoading();
    this.cashPeriod = response.result;
    this.detector.detectChanges();
  }
  async loadReceipts(filter: Filter) {
    return await this.shopsService.getCashPeriodReceipts(this.cashPeriod.id,filter);
  }
  closeCurrentPeriod() {
    this.dialogs.pushConfirm(
      'Закрыть период',
      'Вы точно хотите закрыть текущий период?',
      async () => {
        this.dialogs.startLoading();
        const response = await this.shopsService.closeCurrentPeriod();
        this.dialogs.stopLoading();
        if (response.isSuccess) {
          await this.load();
        } else {
          this.dialogs.pushAlert(response.errorMessage);
        }
        this.detector.detectChanges();
      }
    );
  }
  collectCash() {
    this.dialogs.push({
      component: CashPeriodCollectCashComponent,
      onInstance: (i) => {
        i.collected.subscribe(async () => {
          await this.load();
        });
      },
    });
  }
  openNewPeriod() {
    this.dialogs.push({
      component: CashPeriodOpenNewComponent,
      onInstance: (i) => {
        i.opened.subscribe(async () => {
          await this.load();
        });
      },
    });
  }
  async load() {
    this.tableService.tables.forEach((x) => x.table.loadData());
    this.cashPeriod = (await this.shopsService.getCurrentPeriod()).result;
    this.detector.detectChanges();
  }
  openReceipt(receipt: Receipt) {
    this.dialogs.push({ component: ReceiptInfoComponent, data: receipt });
  }
}
