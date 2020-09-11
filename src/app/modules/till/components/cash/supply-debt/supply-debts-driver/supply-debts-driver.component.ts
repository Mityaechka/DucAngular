import { SupplyDebtActivePayRequestTakeComponent } from './../supply-debt-active-pay-request-take/supply-debt-active-pay-request-take.component';
import { Component, OnInit } from '@angular/core';
import { SaleFormType, SaleFormTypeDisplay } from 'src/app/enums/sale-form-type.enum';
import { SupplyDebtService } from 'src/app/services/supply-debt.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { TableService } from 'src/app/services/table.service';
import { SupplyDebt } from 'src/app/entities/supply-debt.entity';
import { SupplyDebtBindDriverComponent } from '../supply-debt-bind-driver/supply-debt-bind-driver.component';

@Component({
  selector: 'app-supply-debts-driver',
  templateUrl: './supply-debts-driver.component.html',
  styleUrls: ['./supply-debts-driver.component.css']
})
export class SupplyDebtsDriverComponent implements OnInit {

  SaleformType = SaleFormType;
  SaleformTypeDisplay = SaleFormTypeDisplay;
  constructor(
    private supplyDebtService: SupplyDebtService,
    private dialogs: DialogsService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {}
  async loadData() {
    return await this.supplyDebtService.getActiveDriverDebts();
  }
 takeRequest(debt:SupplyDebt){
   this.dialogs.push({component:SupplyDebtActivePayRequestTakeComponent,data:debt.id})
 }

}
