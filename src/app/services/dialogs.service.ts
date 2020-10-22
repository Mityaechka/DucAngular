import { tillRoutes } from './../modules/till/till-routing.module';
import { ConfirmComponent } from './../components/confirm/confirm.component';
import { LoadingComponent } from './../components/loading/loading.component';
import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogData } from '../models/dialog-data.model';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root',
})
export class DialogsService {
  dialogs: MatDialogRef<any>[] = [];
  ref: MatDialogRef<LoadingComponent>;

  constructor(private dialog: MatDialog) {}
  push(dialogData: DialogData): void {
    const data = Object.assign(dialogData.config ?? {}, {
      disableClose: false,
      data: dialogData.data,
      width: '500px',
    });
    const ref = this.dialog.open(dialogData.component, data);
    if (dialogData.onInstance) {
      dialogData.onInstance(ref.componentInstance);
    }

    this.dialogs.push(ref);
  }
  getCurrentRef() {
    return this.dialogs[this.dialogs.length - 1];
  }
  pop(): void {
    const ref = this.dialogs.pop();
    ref.close();
  }
  popByRef(ref: MatDialogRef<any, any>): void {
    this.dialogs = this.dialogs.filter((x) => x !== ref);
    ref.close();
  }
  popAll(): void {
    while (this.dialogs.length > 0) {
      const ref = this.dialogs.pop();
      ref.close();
    }
  }
  pushAlert(message: string, title = 'Внимание!'): void {
    this.push({ component: AlertComponent, data: { message, title } });
  }
  pushConfirm(title: string, body: string, onOk: () => void): void {
    this.push({ component: ConfirmComponent, data: { title, body, onOk } });
  }
  startLoading(message?): void {
    this.ref = this.dialog.open(LoadingComponent, {
      disableClose: true,
      data: message === '' || message === undefined ? 'Загрузка...' : message,
    });
  }

  stopLoading(): void {
    if (this.ref) {
      this.ref.close();
    }
  }
}
