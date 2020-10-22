import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReceiptTemplate } from 'src/app/entities/receipt-template/receipt-template.entiry';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ReceiptTemplatesService } from 'src/app/services/receipt-templates.service';
import { ReceiptTemplateCreateComponent } from '../receipt-template-create/receipt-template-create.component';

@Component({
  selector: 'app-receipt-template-edit',
  templateUrl: './receipt-template-edit.component.html',
  styleUrls: ['./receipt-template-edit.component.css'],
})
export class ReceiptTemplateEditComponent implements OnInit {
  @Output() edited = new EventEmitter();

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    receiptFields: new FormControl(undefined,[Validators.required]),
  });
  get receiptFields() {
    return this.form.controls.receiptFields as FormControl;
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public template: ReceiptTemplate,
    private ref: MatDialogRef<ReceiptTemplateCreateComponent>,
    private receiptTemplatesService: ReceiptTemplatesService,
    private dialogs: DialogsService
  ) {}

  async ngOnInit() {
    this.ref.updateSize('1500px');
    this.dialogs.startLoading();
    const response = await this.receiptTemplatesService.getTemplate(
      this.template.id
    );
    this.dialogs.stopLoading();
    this.form.patchValue({
      name: response.result.name,
      receiptFields: response.result.receiptFields,
    });
  }
  async edit() {
    this.dialogs.startLoading();
    const response = await this.receiptTemplatesService.editTemplate(
      this.template.id,
      this.form.getRawValue()
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.edited.emit();
      this.dialogs.pop();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
  }
}
