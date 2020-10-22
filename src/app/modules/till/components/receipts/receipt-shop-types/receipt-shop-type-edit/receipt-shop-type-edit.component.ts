import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReceiptTemplate } from 'src/app/entities/receipt-template/receipt-template.entiry';
import { ReceiptType } from 'src/app/entities/receipt-type';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ReceiptTemplatesService } from 'src/app/services/receipt-templates.service';

@Component({
  selector: 'app-receipt-shop-type-edit',
  templateUrl: './receipt-shop-type-edit.component.html',
  styleUrls: ['./receipt-shop-type-edit.component.css'],
})
export class ReceiptShopTypeEditComponent implements OnInit {
  @Output() edited = new EventEmitter();

  form = new FormGroup({
    typeId: new FormControl(undefined, [Validators.required]),
    templateId: new FormControl(undefined, [Validators.required]),
  });
  templates: ReceiptTemplate[];
  types: ReceiptType[];
  constructor(
    @Inject(MAT_DIALOG_DATA) private shopReceiptTypeId: number,
    private detector: ChangeDetectorRef,
    private dialogs: DialogsService,
    private receiptTemplatesService: ReceiptTemplatesService
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const response = await this.receiptTemplatesService.getShopReceiptType(
      this.shopReceiptTypeId
    );
    if (response.isSuccess) {
      this.form.patchValue({
        typeId: response.result.receiptType.id,
        templateId: response.result.receiptTemplate.id,
      });

      const templatesResponse = await this.receiptTemplatesService.getTemplates();
      const typesResponse = await this.receiptTemplatesService.getReceiptTypes();
      this.templates = templatesResponse.result.list;
      this.types = typesResponse.result.list;
    }
    this.dialogs.stopLoading();
    this.detector.detectChanges();
  }
  async edit() {
    this.dialogs.startLoading();
    const response = await this.receiptTemplatesService.editShopReceiptTypes(
      this.shopReceiptTypeId,
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
