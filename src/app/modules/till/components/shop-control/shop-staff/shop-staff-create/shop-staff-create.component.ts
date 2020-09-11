import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop-staff-create',
  templateUrl: './shop-staff-create.component.html',
  styleUrls: ['./shop-staff-create.component.css'],
})
export class ShopStaffCreateComponent implements OnInit {
  form = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    fio: new FormControl('', [Validators.required]),
    role: new FormControl(  '', [Validators.required]),
  });
  constructor() {}

  ngOnInit(): void {}
}
