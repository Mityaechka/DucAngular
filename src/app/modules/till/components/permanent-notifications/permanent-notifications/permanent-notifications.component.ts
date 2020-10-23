import {
  NotificationModel,
  NotificationHubService,
} from './../../../../../services/notification-hub.service';
import { PermanentNotificationService } from './../../../../../services/permanent-notification.service';
import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { PermanentNotification } from 'src/app/entities/permanent-notification.entity';
import { SortEnum } from 'src/app/models/filter.model';

@Component({
  selector: 'app-permanent-notifications',
  templateUrl: './permanent-notifications.component.html',
  styleUrls: ['./permanent-notifications.component.css'],
})
export class PermanentNotificationsComponent implements OnInit, OnDestroy {
  isLoading = false;
  notifications: PermanentNotification[];
  action: any;
  constructor(
    private permanentNotificationService: PermanentNotificationService,
    private detector: ChangeDetectorRef,
    private notificationHubService: NotificationHubService
  ) {}
  ngOnDestroy(): void {
    this.notificationHubService.removeEvent(this.action);
  }
  async ngOnInit() {
    this.action = this.notificationHubService.registerEvents(
      (data: NotificationModel) => this.loadData(),
      'PermanentNotification'
    );
    await this.loadData();
  }
  async loadData() {
    this.isLoading = true;
    const response = await this.permanentNotificationService.getNotCheckedNotifications(
      {
        sortParametr: { parametr: 'Date', sort: SortEnum.Desc },
        page: 0,
        pageSize: 999,
      }
    );
    this.isLoading = false;
    if (response.isSuccess) {
      this.notifications = response.result.list;
    }
    this.detector.detectChanges();
  }
  async checkNotification(notification: PermanentNotification) {
    await this.permanentNotificationService.checkNotification(notification.id);
  }
}
