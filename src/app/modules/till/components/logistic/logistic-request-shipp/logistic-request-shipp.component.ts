import { RequestService } from 'src/app/services/request.service';
import { DialogsService } from './../../../../../services/dialogs.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormControl,
  ValidatorFn,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { ProductRequest } from 'src/app/entities/product-request.entity';

@Component({
  selector: 'app-logistic-request-shipp',
  templateUrl: './logistic-request-shipp.component.html',
  styleUrls: ['./logistic-request-shipp.component.css'],
})
export class LogisticRequestShippComponent implements OnInit {
  accept: FormControl;
  sum: FormControl;
  get canConfirm() {

    debugger;
    return (
      (this.accept.value == false ||
        this.productRequest.logisticProductRequest.isShipped) &&
      (this.sum.value !== 0 || this.productRequest.leftSum === 0)
    );
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public productRequest: ProductRequest,
    private dialogs: DialogsService,
    private requestservice: RequestService
  ) {}

  ngOnInit(): void {
    this.accept = new FormControl(false, [Validators.required]);
    this.sum = new FormControl('0', [
      Validators.required,
      Validators.max(this.productRequest.leftSum),
    ]);
  }
  async addPayRequest() {
    this.dialogs.startLoading();
    const response = await this.requestservice.addPayRequest(
      this.productRequest.id,
      this.sum.value
    );
    this.dialogs.stopLoading();
    if (response.isSuccess){
      this.dialogs.pop();
      this.dialogs.pushAlert('Запрос успешно отправлен');
    }else{
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
