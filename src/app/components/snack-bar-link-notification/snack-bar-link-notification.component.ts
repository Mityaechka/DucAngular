import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackBarNotificationComponent } from '../snack-bar-notification/snack-bar-notification.component';

@Component({
  selector: 'app-snack-bar-link-notification',
  templateUrl: './snack-bar-link-notification.component.html',
  styleUrls: ['./snack-bar-link-notification.component.css'],
})
export class SnackBarLinkNotificationComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { header: string; body: string; link: string },
    public ref: MatSnackBarRef<SnackBarNotificationComponent>
  ) {}

  ngOnInit(): void {}
  @HostListener('click') onClick() {
    this.ref.dismiss();
  }
}
