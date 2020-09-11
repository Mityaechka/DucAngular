import { Router } from '@angular/router';
import { DialogsService } from './../../../../services/dialogs.service';
import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { User } from 'src/app/entities/user.entity';

@Component({
  selector: 'app-main-till',
  templateUrl: './main-till.component.html',
  styleUrls: ['./main-till.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainTillComponent implements OnInit {
  user: User;
  constructor(
    private authService: AuthService,
    private dialogs: DialogsService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.user = (await this.authService.getUser()).result;
  }
  async logout() {
    this.dialogs.startLoading();
    const response = await this.authService.logout();
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.router.navigate(['']);
    }
  }
}
