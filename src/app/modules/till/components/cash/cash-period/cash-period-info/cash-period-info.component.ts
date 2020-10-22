import { Receipt } from 'src/app/entities/receipt.entity';
import { ShopsService } from 'src/app/services/shops.service';
import { CashPeriod } from 'src/app/entities/cash-period.entity';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DialogsService } from 'src/app/services/dialogs.service';
import { Filter } from 'src/app/models/filter.model';

@Component({
  selector: 'app-cash-period-info',
  templateUrl: './cash-period-info.component.html',
  styleUrls: ['./cash-period-info.component.css'],
})
export class CashPeriodInfoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public cashPeriod: CashPeriod,
    private dialogs: DialogsService,
    private detector: ChangeDetectorRef,
    private ref: MatDialogRef<CashPeriodInfoComponent>,
    private shopsService: ShopsService
  ) {}
  async loadReceipts(filter: Filter) {
    return await this.shopsService.getCashPeriodReceipts(
      this.cashPeriod.id,
      filter
    );
  }
  async ngOnInit() {
    this.dialogs.startLoading();
    const periodResponse = await this.shopsService.getCashPeriod(
      this.cashPeriod.id
    );
    this.dialogs.stopLoading();
    if (periodResponse.isSuccess) {
      this.cashPeriod = periodResponse.result;
    }
    this.detector.detectChanges();
  }
}
