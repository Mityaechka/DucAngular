import { TableService } from './../../../../../../services/table.service';
import { async } from '@angular/core/testing';
import { DialogsService } from 'src/app/services/dialogs.service';
import { MoneyTransferState } from './../../../../../../enums/money-transfer-state.enum';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MoneyTransferService } from 'src/app/services/money-transfer.service';
import { MoneyTransfer } from 'src/app/entities/money-transfer.entity';
import { TableComponent } from 'src/app/modules/table/table/table.component';
import { NotificationHubService, NotificationModel } from 'src/app/services/notification-hub.service';

@Component({
  selector: 'app-from-not-transfered',
  templateUrl: './from-not-transfered.component.html',
  styleUrls: ['./from-not-transfered.component.css'],
})
export class FromNotTransferedComponent implements OnInit {
  @ViewChild('table') table: TableComponent<any>;
  MoneyTransferState = MoneyTransferState;
  constructor(
    private transferService: MoneyTransferService,
    private dialogs: DialogsService,
    private tableService: TableService,
    private notificationHubService: NotificationHubService
  ) {}

  ngOnInit(): void {
    this.notificationHubService.registerEvents((data: NotificationModel) => {
      this.table.loadData();
    },
    'AcceptTransfer');
  }
  async loadData() {
    return await this.transferService.getFromNotTransfered();
  }
  payTransfer(transfer: MoneyTransfer) {
    this.dialogs.pushConfirm(
      `Подтверждение запроса`,
      `Вы точно передали ${transfer.sum} тг.?`,
      async () => {
        this.dialogs.startLoading();
        const response = await this.transferService.payTransfer(transfer.id);
        this.dialogs.stopLoading();
        if (response.isSuccess) {
          this.tableService.tables.forEach((x) => x.table.loadData());
        } else {
          this.dialogs.pushAlert(response.errorMessage);
        }
      }
    );
  }
}
