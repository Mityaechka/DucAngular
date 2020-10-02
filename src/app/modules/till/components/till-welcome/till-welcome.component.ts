import { ProductType } from './../../../../entities/product-type';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-till-welcome',
  templateUrl: './till-welcome.component.html',
  styleUrls: ['./till-welcome.component.css'],
})
export class TillWelcomeComponent implements OnInit {
  _selected: ProductType;
   selected(p: ProductType) {
    this._selected = p;
  }
  ngOnInit(): void {}
}
