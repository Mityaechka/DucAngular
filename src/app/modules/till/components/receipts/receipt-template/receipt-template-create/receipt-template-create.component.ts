import { ReceiptTemplatesService } from 'src/app/services/receipt-templates.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-receipt-template-create',
  templateUrl: './receipt-template-create.component.html',
  styleUrls: ['./receipt-template-create.component.css'],
})
export class ReceiptTemplateCreateComponent implements OnInit {
  @Output() created = new EventEmitter();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    receiptFields: new FormControl(undefined,[Validators.required]),
  });
  get receiptFields() {
    return this.form.controls.receiptFields as FormControl;
  }
  constructor(
    private ref: MatDialogRef<ReceiptTemplateCreateComponent>,
    private receiptTemplatesService: ReceiptTemplatesService,
    private dialogs: DialogsService
  ) {}

  ngOnInit(): void {
    this.ref.updateSize('1500px');
  }
  async create() {
    this.dialogs.startLoading();
    const response = await this.receiptTemplatesService.createTemplate(
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
