import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopsService } from 'src/app/services/shops.service';
import { SupplyDebtService } from './../../../../../../services/supply-debt.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { SupplyDebt } from './../../../../../../entities/supply-debt.entity';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  Inject,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Shop } from 'src/app/entities/shop.entity';
import { User } from 'src/app/entities/user.entity';

@Component({
  selector: 'app-supply-debt-bind-driver',
  templateUrl: './supply-debt-bind-driver.component.html',
  styleUrls: ['./supply-debt-bind-driver.component.css'],
})
export class SupplyDebtBindDriverComponent implements OnInit {
  shops: Shop[];
  users: User[];

  shopControl = new FormControl('', [Validators.required]);
  userControl = new FormControl('', [Validators.required]);

  @Output() onBinded = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) public supplyDebt: SupplyDebt,
    private dialogs: DialogsService,
    private supplyDebtService: SupplyDebtService,
    private shopsService: ShopsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.loadData();
  }
  async loadData() {
    this.dialogs.startLoading();
    const debtResponse = await this.supplyDebtService.getActiveOwnerDebt(
      this.supplyDebt.id
    );
    if (debtResponse.isSuccess) {
      this.supplyDebt = debtResponse.result;
      const shopsResponse = await this.shopsService.getLogisticShops();
      if (shopsResponse.isSuccess) {
        this.shops = shopsResponse.result;
      }
      if (this.supplyDebt.bindedLogisticCompany) {
        this.shopControl = new FormControl(
          this.supplyDebt.bindedLogisticCompany.id,
          [Validators.required]
        );
        if (this.supplyDebt.bindedDriver) {
          this.userControl = new FormControl(this.supplyDebt.bindedDriver.id, [
            Validators.required,
          ]);
        }
        const usersResponse = await this.shopsService.getLogisticShopUsers(
          this.supplyDebt.bindedLogisticCompany.id
        );
        if (usersResponse.isSuccess) {
          this.users = usersResponse.result;
        }
      }
    }
    this.dialogs.stopLoading();
    this.detector.markForCheck();
  }
  async bindShop() {
    this.dialogs.startLoading();
    const response = await this.supplyDebtService.bindShop(
      this.supplyDebt.id,
      this.shopControl.value
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      await this.loadData();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
  async bindUser() {
    this.dialogs.startLoading();
    const response = await this.supplyDebtService.bindUser(
      this.supplyDebt.id,
      this.userControl.value
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.dialogs.pop();
      this.onBinded.emit();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
