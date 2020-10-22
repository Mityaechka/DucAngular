import { logging } from 'protractor';
import { ConfigService } from './config.service';
import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
export class NotificationModel {
  header: string;
  body: string;
  event: string;
  additionalData: any;
}
@Injectable({
  providedIn: 'root',
})
export class NotificationHubService {
  private connectionEstablished = new EventEmitter<boolean>();
  events: { name: string; action: (data: NotificationModel) => void }[] = [];
  globalEvents: ((data: NotificationModel) => void)[] = [];
  private path: string;

  public hubConnection: HubConnection;

  private isConnected = false;
  constructor(private config: ConfigService) {
    this.path = `${config.baseUrl}/notifications`;
  }
  connect() {
    if (this.isConnected) {
      return;
    }
    this.hubConnection = new HubConnectionBuilder().withUrl(this.path).build();
    this.hubConnection.on('Notification', (data) => this.onNotifiaction(data));
    this.startConnection();
  }
  close() {
    if (!this.isConnected) {
      return;
    }
    if (this.hubConnection) {
      this.hubConnection
        .stop()
        .then((x) => {
          this.connectionEstablished.emit(false);
          console.log('Подключение успешно закрыто');
          this.isConnected = false;
        })
        .catch(() => console.log('Ошибка при закрытие соеденения'));
    }
  }
  private startConnection(): void {
    if (this.isConnected) {
      return;
    }
    this.hubConnection
      .start()
      .then(() => {
        this.connectionEstablished.emit(true);
        console.log('Подключение усппешно установлено');
        this.isConnected = true;
      })
      .catch((err) => {
        console.log('Не удалось подключиться...');
        setTimeout(() => {
          this.startConnection();
        }, 5000);
      });
  }

  public onConnect(action: () => void) {
    this.connectionEstablished.subscribe(action);
  }
  private onNotifiaction(data: NotificationModel) {
    console.log(data);
    if (!this.events.some((x) => x.name === data.event)) {
      for (const event of this.globalEvents) {
        event(data);
      }
    } else {
      for (const event of this.events.filter((x) => x.name === data.event)) {
        event.action(data);
      }
    }
  }
  public registerEvents(
    action: (data: NotificationModel) => void,
    ...events: string[]
  ) {
    for (const e of events) {
      this.events.push({ name: e, action });
    }
  }
  public registerForAll(action: (data: NotificationModel) => void) {
    this.globalEvents.push(action);
  }
}
