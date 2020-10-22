import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ProductLine } from './../../../../../entities/product-line';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  Inject,
} from '@angular/core';

@Component({
  selector: 'app-provider-request-confirm-count',
  templateUrl: './provider-request-confirm-count.component.html',
  styleUrls: ['./provider-request-confirm-count.component.css'],
})
export class ProviderRequstConfirmCountComponent implements OnInit {
  @Output() confirmed = new EventEmitter();

  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { requestId: number; productLine: ProductLine },
    private dialogs: DialogsService,
    private requestService: RequestService
  ) {
    this.form = new FormGroup({
      count: new FormControl(data.productLine.responseCount, [
        Validators.required,
        Validators.min(1),
        Validators.max(data.productLine.requestCount),
      ]),
    });
  }

  ngOnInit(): void {}
  async confirm() {
    this.dialogs.startLoading();
    const response = await this.requestService.confirmResponseCount(
      this.data.requestId,
      this.data.productLine.id,
      this.form.controls.count.value
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.confirmed.emit();
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
