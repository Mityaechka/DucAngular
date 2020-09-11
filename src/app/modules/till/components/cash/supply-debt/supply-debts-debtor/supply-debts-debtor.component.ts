import { SupplyDebt } from 'src/app/entities/supply-debt.entity';
import { SaleFormTypeDisplay } from './../../../../../../enums/sale-form-type.enum';
import { SupplyDebtService } from './../../../../../../services/supply-debt.service';
import { Component, OnInit } from '@angular/core';
import { SaleFormType } from 'src/app/enums/sale-form-type.enum';
import { DialogsService } from 'src/app/services/dialogs.service';
import { TableService } from 'src/app/services/table.service';
import { SupplyDebtActivePayRequestComponent } from '../supply-debt-active-pay-request/supply-debt-active-pay-request.component';
import { SupplyDebtPayRequest } from 'src/app/entities/supply-debt-pay-request.entity';

@Component({
  selector: 'app-supply-debts-debtor',
  templateUrl: './supply-debts-debtor.component.html',
  styleUrls: ['./supply-debts-debtor.component.css'],
})
export class SupplyDebtsDebtorComponent implements OnInit {
  SaleformType = SaleFormType;
  SaleformTypeDisplay = SaleFormTypeDisplay;
  constructor(
    private supplyDebtService: SupplyDebtService,
    private dialogs: DialogsService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {}
  async loadData() {
    return await this.supplyDebtService.getActiveDetorDebts();
  }
  makeRequest(debt: SupplyDebt) {
    this.dialogs.pushConfirm(
      'Запрос на выплату',
      'Вы точно хотите запросить выплату по данному долгу?',
      async () => {
        this.dialogs.startLoading();
        const response = await this.supplyDebtService.makeRequest(debt.id);

        if (response.isSuccess) {
          this.tableService.tables.forEach((x) => x.table.loadDataEvent());
          const payRequest = await this.supplyDebtService.getActivePayRequest(
            debt.id
          );
          if (payRequest.isSuccess) {
            this.dialogs.push({
              component: SupplyDebtActivePayRequestComponent,
              data: payRequest.result,
            });
          }
        } else {
          this.dialogs.pushAlert(response.errorMessage);
        }
        this.dialogs.stopLoading();
      }
    );
  }
  async actvivePayRequest(debt: SupplyDebt) {
    this.dialogs.startLoading();
    const payRequest = await this.supplyDebtService.getActivePayRequest(
      debt.id
    );
    this.dialogs.stopLoading();
    if (payRequest.isSuccess) {
      this.dialogs.push({
        component: SupplyDebtActivePayRequestComponent,
        data: payRequest.result,
      });
    }
  }
}
