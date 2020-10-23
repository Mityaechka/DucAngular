import { RouteNames } from './../../../models/route-names.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService } from '../../../services/page.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Input() title: string;
  @Input() path: string;

  constructor(
    private pageService: PageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  navigate() {
    //const obj = RouteNames.routeNamesObject[this.path];

    //this.pageService.cahngeTitle(obj.title);
    this.router.navigate([this.path], { relativeTo: this.route });
  }
}
