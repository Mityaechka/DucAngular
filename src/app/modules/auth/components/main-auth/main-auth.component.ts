import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main-auth',
  templateUrl: './main-auth.component.html',
  styleUrls: ['./main-auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainAuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
