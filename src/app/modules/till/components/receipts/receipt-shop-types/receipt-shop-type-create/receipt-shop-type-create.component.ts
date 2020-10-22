import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  ChangeDetectorRef,
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { ReceiptTemplate } from 'src/app/entities/receipt-template/receipt-template.entiry';
import { ReceiptType } from 'src/app/entities/receipt-type';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ReceiptTemplatesService } from 'src/app/services/receipt-templates.service';

@Component({
  selector: 'app-receipt-shop-type-create',
  templateUrl: './receipt-shop-type-create.component.html',
  styleUrls: ['./receipt-shop-type-create.component.css'],
})
export class ReceiptShopTypeCreateComponent implements OnInit {
  @Output() created = new EventEmitter();

  form = new FormGroup({
    typeId: new FormControl(undefined, [Validators.required]),
    templateId: new FormControl(undefined, [Validators.required]),
  });
  templates: ReceiptTemplate[];
  types: ReceiptType[];
  constructor(
    private detector: ChangeDetectorRef,
    private dialogs: DialogsService,
    private receiptTemplatesService: ReceiptTemplatesService
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const templatesResponse = await this.receiptTemplatesService.getTemplates();
    const typesResponse = await this.receiptTemplatesService.getReceiptTypes();
    this.dialogs.stopLoading();
    this.templates = templatesResponse.result.list;
    this.types = typesResponse.result.list;
    this.detector.detectChanges();
  }
  async create() {
    this.dialogs.startLoading();
    const response = await this.receiptTemplatesService.createShopReceiptTypes(
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
