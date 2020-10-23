import { OperatorEnum } from 'src/app/models/filter.model';
import { OperatioType } from './../../../../enums/operation-type.enum';
import { PermanentNotificationService } from './../../../../services/permanent-notification.service';
import { SnackBarService } from './../../../../services/snack-bar.service';
import {
  NotificationHubService,
  NotificationModel,
} from './../../../../services/notification-hub.service';
import { ScannerService } from './../../../../services/scanner.service';
import { ShopsService } from 'src/app/services/shops.service';
import { CurrentShopSelectComponent } from './../current-shop-select/current-shop-select.component';
import { PageService } from './../../../../services/page.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DialogsService } from './../../../../services/dialogs.service';
import { AuthService } from './../../../../services/auth.service';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnDestroy,
  ViewRef,
} from '@angular/core';
import { User } from 'src/app/entities/user.entity';
import { Shop } from 'src/app/entities/shop.entity';
import { RouteNames } from 'src/app/models/route-names.model';

@Component({
  selector: 'app-main-till',
  templateUrl: './main-till.component.html',
  styleUrls: ['./main-till.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTillComponent implements OnInit, OnDestroy {
  user: User;
  currentShop: Shop;
  title = 'DUK';
  notificationsCount = 0;
  isOpen = false;
  constructor(
    private authService: AuthService,
    private dialogs: DialogsService,
    private router: Router,
    private pageService: PageService,
    private shopsService: ShopsService,
    private detector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private scanner: ScannerService,
    private notificationHubService: NotificationHubService,
    private snackBarService: SnackBarService,
    private permanentNotificationService: PermanentNotificationService
  ) {}
  ngOnDestroy(): void {
    this.detector.detach();
  }

  async ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        const end = val as NavigationEnd;
        const obj = RouteNames.routeNamesObject.find((x) => x.path === end.url);
        this.pageService.cahngeTitle(obj?.title ?? 'DUC');
      }
    });

    this.notificationHubService.connect();

    this.notificationHubService.registerForAll((data: NotificationModel) => {
      this.snackBarService.open(data.header, data.body);
    });
    this.notificationHubService.registerEvents((data: NotificationModel) => {
      this.permanentNotificationService
        .getNotCheckedNotificationsCount()
        .then((result) => {
          if ((this.detector as ViewRef).destroyed) {
            return;
          }
          if (result.isSuccess) {
            this.notificationsCount = result.result;
          }
          this.detector.detectChanges();
        });
    }, 'PermanentNotification');

    // this.notificationHubService.onConnect(() => {

    // });
    this.permanentNotificationService
      .getNotCheckedNotificationsCount()
      .then((result) => {
        if (result.isSuccess) {
          this.notificationsCount = result.result;
        }
      });
    this.authService.userChange.subscribe((user: User) => {
      if (user) {
        this.notificationHubService.connect();
      } else {
        this.notificationHubService.close();
      }
    });

    this.user = (await this.authService.getUser()).result;
    this.pageService.subscribeOnTitleChange((x) => {
      this.title = x;
    });
    this.shopsService.currentShopChangeSubscribe((shop) => {
      if ((this.detector as ViewRef).destroyed) {
        return;
      }
      this.currentShop = shop;
      this.detector.detectChanges();
    });
    this.shopsService.reloadCurrenShop();

    const path = this.router.url;
    const obj = RouteNames.routeNamesObject.find((x) => x.path === path);
    this.pageService.cahngeTitle(obj?.title ?? 'DUC');
  }
  async logout() {
    this.dialogs.startLoading();
    const response = await this.authService.logout();
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.router.navigate(['']);
    }
  }
  selectShopclick() {
    this.dialogs.push({
      component: CurrentShopSelectComponent,
      onInstance: (i) => {
        i.selected.subscribe(() => {
          this.router.navigate([this.router.url], { relativeTo: this.route });
          location.reload();
        });
      },
    });
  }
}
