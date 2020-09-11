import { Component, OnInit } from '@angular/core';
import { MoneyTransferState } from 'src/app/enums/money-transfer-state.enum';
import { MoneyTransferService } from 'src/app/services/money-transfer.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { TableService } from 'src/app/services/table.service';
import { MoneyTransfer } from 'src/app/entities/money-transfer.entity';

@Component({
  selector: 'app-to-not-transfered',
  templateUrl: './to-not-transfered.component.html',
  styleUrls: ['./to-not-transfered.component.css']
})
export class ToNotTransferedComponent implements OnInit {
  MoneyTransferState = MoneyTransferState;
  constructor(
    private transferService: MoneyTransferService,
    private dialogs: DialogsService,
    private tableService: TableService
  ) {}

  ngOnInit(): void {}
  async loadData() {
    return await this.transferService.getToNotTransfered();
  }
  acceptTransfer(transfer: MoneyTransfer) {
    this.dialogs.pushConfirm(
      `Подтверждение запроса`,
      `Вы точно получили ${transfer.sum} тг.?`,
      async () => {
        this.dialogs.startLoading();
        const response = await this.transferService.acceptTransfer(transfer.id);
        this.dialogs.stopLoading();
        if (response.isSuccess) {
          this.tableService.tables.forEach((x) => x.table.loadDataEvent());
        } else {
          this.dialogs.pushAlert(response.errorMessage);
        }
      }
    );
  }

}
