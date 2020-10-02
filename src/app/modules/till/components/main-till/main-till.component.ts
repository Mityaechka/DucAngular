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
} from '@angular/core';
import { User } from 'src/app/entities/user.entity';
import { Shop } from 'src/app/entities/shop.entity';

@Component({
  selector: 'app-main-till',
  templateUrl: './main-till.component.html',
  styleUrls: ['./main-till.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTillComponent implements OnInit {
  user: User;
  currentShop: Shop;
  title = 'DUK';
  constructor(
    private authService: AuthService,
    private dialogs: DialogsService,
    private router: Router,
    private pageService: PageService,
    private shopsService: ShopsService,
    private detector: ChangeDetectorRef,
    private route: ActivatedRoute,
    private scanner: ScannerService
  ) {}

  async ngOnInit() {
    this.user = (await this.authService.getUser()).result;
    this.pageService.subscribeOnTitleChange((x) => {
      this.title = x;
    });
    this.shopsService.currentShopChangeSubscribe((shop) => {
      this.currentShop = shop;
      this.detector.detectChanges();
    });
    this.shopsService.reloadCurrenShop();
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
