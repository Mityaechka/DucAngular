import { SupplyDebtBindDriverComponent } from './../supply-debt-bind-driver/supply-debt-bind-driver.component';
import { Component, OnInit } from '@angular/core';
import {
  SaleFormType,
  SaleFormTypeDisplay,
} from 'src/app/enums/sale-form-type.enum';
import { SupplyDebtService } from 'src/app/services/supply-debt.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { TableService } from 'src/app/services/table.service';
import { SupplyDebt } from 'src/app/entities/supply-debt.entity';

@Component({
  selector: 'app-supply-debts-owner',
  templateUrl: './supply-debts-owner.component.html',
  styleUrls: ['./supply-debts-owner.component.css'],
})
export class SupplyDebtsOwnerComponent implements OnInit {
  SaleformType = SaleFormType;
  SaleformTypeDisplay = SaleFormTypeDisplay;
  constructor(
    private supplyDebtService: SupplyDebtService,
    private dialogs: DialogsService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {}
  async loadData() {
    return await this.supplyDebtService.getActiveOwnerDebts();
  }
  bindDriver(debt: SupplyDebt) {
    this.dialogs.push({
      component: SupplyDebtBindDriverComponent,
      data: debt,
      onInstance: (i) => {
        i.onBinded.subscribe(async () => {
          this.tableService.tables.forEach(x=>x.table.loadData());
          this.dialogs.pushAlert('Водитель успешно назначен');
        });
      },
    });
  }
}
