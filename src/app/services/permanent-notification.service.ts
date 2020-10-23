import { Filter } from 'src/app/models/filter.model';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { PermanentNotification } from '../entities/permanent-notification.entity';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class PermanentNotificationService {
  constructor(private http: HttpService) {}
  async getNotCheckedNotifications(filter?: Filter) {
    return await this.http.post<List<PermanentNotification>>(
      `permanentNotification`,
      filter
    );
  }
  async getNotCheckedNotificationsCount() {
    return await this.http.get<number>(`permanentNotification/count`);
  }
  async checkNotification(id: number) {
    return await this.http.get(`permanentNotification/${id}/check`);
  }
}
