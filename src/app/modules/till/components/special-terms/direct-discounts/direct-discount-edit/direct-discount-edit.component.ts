import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DirectDiscount } from 'src/app/entities/direct-discount.entity';
import { DialogsService } from 'src/app/services/dialogs.service';
import { DirectDiscountsService } from 'src/app/services/direct-discounts.service';

@Component({
  selector: 'app-direct-discount-edit',
  templateUrl: './direct-discount-edit.component.html',
  styleUrls: ['./direct-discount-edit.component.css'],
})
export class DirectDiscountEditComponent implements OnInit {
  @Output() edited = new EventEmitter();
  form = new FormGroup({
    shops: new FormControl(undefined),
    products: new FormControl(undefined),
    amount: new FormControl(0, [Validators.required, Validators.min(0.01)]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public discount: DirectDiscount,
    private dialogs: DialogsService,
    private directDiscountsService: DirectDiscountsService,
    private detector: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const response = await this.directDiscountsService.getDirectiscount(
      this.discount.id
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.discount = response.result;
    }
    this.form.patchValue({
      shops: this.discount.shops,
      products: this.discount.products,
      amount: this.discount.amount,
    });
    this.detector.detectChanges();
  }
  async editDiscount() {
    this.dialogs.startLoading();
    const response = await this.directDiscountsService.editDirectiscount(this.discount.id,
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.edited.emit(response.result);
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
