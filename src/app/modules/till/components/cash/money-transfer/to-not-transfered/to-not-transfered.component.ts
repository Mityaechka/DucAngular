import { NotificationModel } from './../../../../../../services/notification-hub.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MoneyTransferState } from 'src/app/enums/money-transfer-state.enum';
import { MoneyTransferService } from 'src/app/services/money-transfer.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { TableService } from 'src/app/services/table.service';
import { MoneyTransfer } from 'src/app/entities/money-transfer.entity';
import { NotificationHubService } from 'src/app/services/notification-hub.service';
import { TableComponent } from 'src/app/modules/table/table/table.component';

@Component({
  selector: 'app-to-not-transfered',
  templateUrl: './to-not-transfered.component.html',
  styleUrls: ['./to-not-transfered.component.css'],
})
export class ToNotTransferedComponent implements OnInit {
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
    'PayTransfer');
  }
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
          this.tableService.tables.forEach((x) => x.table.loadData());
        } else {
          this.dialogs.pushAlert(response.errorMessage);
        }
      }
    );
  }
}
