import { SnackBarLinkNotificationComponent } from './../components/snack-bar-link-notification/snack-bar-link-notification.component';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { title } from 'process';
import { SnackBarNotificationComponent } from '../components/snack-bar-notification/snack-bar-notification.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}
  public open(header: string, body: string) {
    this.snackBar.openFromComponent(SnackBarNotificationComponent, {
      data: {
        header,
        body,
      },
      duration: 4000,
    });
  }
  public openLink(header: string, body: string,link:string) {
    this.snackBar.openFromComponent(SnackBarLinkNotificationComponent, {
      data: {
        header,
        body,
        link
      },
      duration: 50000,
    });
  }
}
