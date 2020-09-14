import { ShopsService } from './../../../../../../services/shops.service';
import { RoleService } from './../../../../../../services/role.service';
import { DialogsService } from './../../../../../../services/dialogs.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Role } from 'src/app/entities/role.entity';

@Component({
  selector: 'app-shop-staff-create',
  templateUrl: './shop-staff-create.component.html',
  styleUrls: ['./shop-staff-create.component.css'],
})
export class ShopStaffCreateComponent implements OnInit {
  @Output() created = new EventEmitter();
  roles: Role[] = [];
  form = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    fio: new FormControl('', [Validators.required]),
    roleId: new FormControl('', [Validators.required]),
  });
  constructor(
    private dialogs: DialogsService,
    private roleService: RoleService,
    private shopsService: ShopsService
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const response = await this.roleService.getRoles();
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.roles = response.result.list;
    }
  }
  async createStaff() {
    this.dialogs.startLoading();
    const response = await this.shopsService.createShopStaff(
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.created.emit();
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
