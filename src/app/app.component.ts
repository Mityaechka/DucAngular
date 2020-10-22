import { PageService } from './services/page.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './entities/user.entity';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showFiller = false;
  constructor(
    private pageService: PageService,
    private titleService: Title,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.pageService.subscribeOnTitleChange((x) => {
      this.titleService.setTitle(`DUK - ${x}`);
    });
  }
}
