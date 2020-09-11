import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductRequest } from 'src/app/entities/product-request.entity';
import { DialogsService } from 'src/app/services/dialogs.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-logistic-request-confirm',
  templateUrl: './logistic-request-confirm.component.html',
  styleUrls: ['./logistic-request-confirm.component.css'],
})
export class LogisticRequestConfirmComponent implements OnInit {
  code = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
  ]);
  constructor(
    @Inject(MAT_DIALOG_DATA) public productRequest: ProductRequest,
    private dialogs: DialogsService,
    private requestservice: RequestService
  ) {}

  ngOnInit(): void {}
  async confirmPayrequest() {
    this.dialogs.startLoading();
    const response = await this.requestservice.confirmPayRequest(
      this.productRequest.id,
      this.code.value
    );
    this.dialogs.stopLoading();
    if (response.isSuccess){
      this.dialogs.pop();
      this.dialogs.pushAlert('Запрос успешно подтвержден');
    }else{
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
