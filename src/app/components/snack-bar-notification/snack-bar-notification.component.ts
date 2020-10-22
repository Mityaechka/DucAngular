import { HostListener, Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar-notification',
  templateUrl: './snack-bar-notification.component.html',
  styleUrls: ['./snack-bar-notification.component.css'],
})
export class SnackBarNotificationComponent implements OnInit {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: { header: string; body: string },
    public ref: MatSnackBarRef<SnackBarNotificationComponent>
  ) {}

  ngOnInit(): void {}
  @HostListener('click') onClick() {
    this.ref.dismiss();
  }
}
