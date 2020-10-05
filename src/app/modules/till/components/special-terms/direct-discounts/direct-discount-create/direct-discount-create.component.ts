import { DialogsService } from 'src/app/services/dialogs.service';
import { DirectDiscountsService } from './../../../../../../services/direct-discounts.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-direct-discount-create',
  templateUrl: './direct-discount-create.component.html',
  styleUrls: ['./direct-discount-create.component.css'],
})
export class DirectDiscountCreateComponent implements OnInit {
  @Output() created = new EventEmitter<number>();
  form = new FormGroup({
    shops: new FormControl(undefined),
    products: new FormControl(undefined),
    amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
  });
  constructor(
    private directDiscountsService: DirectDiscountsService,
    private dialogs: DialogsService
  ) {}
  ngOnInit(){}
  async createDiscount() {
    this.dialogs.startLoading();
    const response = await this.directDiscountsService.createDirectiscount(
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.created.emit(response.result);
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
