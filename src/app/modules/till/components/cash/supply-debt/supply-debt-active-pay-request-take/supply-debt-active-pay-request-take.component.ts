import { TableService } from './../../../../../../services/table.service';
import { SupplyDebtService } from 'src/app/services/supply-debt.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-supply-debt-active-pay-request-take',
  templateUrl: './supply-debt-active-pay-request-take.component.html',
  styleUrls: ['./supply-debt-active-pay-request-take.component.css'],
})
export class SupplyDebtActivePayRequestTakeComponent implements OnInit {
  codeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
  ]);
  constructor(
    @Inject(MAT_DIALOG_DATA) private requestId: number,
    private dialogs: DialogsService,
    private supplyDebtService: SupplyDebtService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {}
  async checkCode() {
    this.dialogs.startLoading();
    const response = await this.supplyDebtService.takeRequest(
      this.requestId,
      this.codeControl.value
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.dialogs.pop();
      this.dialogs.pushAlert('Заказ успешно подтвержден');
      this.tableService.tables.forEach((x) => x.table.loadDataEvent());
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
