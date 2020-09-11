import { SupplyDebtPayRequestCodeComponent } from './../supply-debt-pay-request-code/supply-debt-pay-request-code.component';
import { SupplyDebtService } from 'src/app/services/supply-debt.service';
import { SupplyDebtPayRequest } from './../../../../../../entities/supply-debt-pay-request.entity';
import { DialogsService } from 'src/app/services/dialogs.service';
import { RequestStatusDisplay } from './../../../../../../enums/request-status.enum';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-supply-debt-active-pay-request',
  templateUrl: './supply-debt-active-pay-request.component.html',
  styleUrls: ['./supply-debt-active-pay-request.component.css'],
})
export class SupplyDebtActivePayRequestComponent implements OnInit {
  RequestStatusDisplay = RequestStatusDisplay;
  constructor(
    @Inject(MAT_DIALOG_DATA) public payRequest: SupplyDebtPayRequest,
    private dialogs: DialogsService,
    private supplyDebtService: SupplyDebtService
  ) {}

  ngOnInit(): void {}
  async showCode() {
    this.dialogs.startLoading();
    const response = await this.supplyDebtService.getActivePayRequestCode(
      this.payRequest.supplyDebtId
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.dialogs.push({
        component: SupplyDebtPayRequestCodeComponent,
        data: response.result,
      });
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
