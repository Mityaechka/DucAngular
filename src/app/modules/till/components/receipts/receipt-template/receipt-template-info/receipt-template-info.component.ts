
import { ReceiptTemplateEditComponent } from './../receipt-template-edit/receipt-template-edit.component';
import { DialogsService } from 'src/app/services/dialogs.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Inject,
  ViewChild,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { ReceiptTemplate } from 'src/app/entities/receipt-template/receipt-template.entiry';
import { ReceiptFieldFactory } from 'src/app/modules/receipt-editor/models/receipt-field.model';
import { ReceiptPreviewComponent } from 'src/app/modules/receipt-editor/components/receipt-preview/receipt-preview.component';
import { ReceiptTemplatesService } from 'src/app/services/receipt-templates.service';

@Component({
  selector: 'app-receipt-template-info',
  templateUrl: './receipt-template-info.component.html',
  styleUrls: ['./receipt-template-info.component.css'],
})
export class ReceiptTemplateInfoComponent implements AfterViewInit {
  @Output() edited = new EventEmitter();
  @ViewChild('preview') previewComponent: ReceiptPreviewComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) public template: ReceiptTemplate,
    private dialogs: DialogsService,
    private receiptTemplatesService: ReceiptTemplatesService,
    private detector: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {}
  print() {
    this.previewComponent.print();
  }
  edit() {
    this.dialogs.push({
      component: ReceiptTemplateEditComponent,
      data: this.template,
      onInstance: (i) => {
        i.edited.subscribe(async () => {
          this.edited.emit();
          this.dialogs.startLoading();
          const response = await this.receiptTemplatesService.getTemplate(
            this.template.id
          );
          this.dialogs.stopLoading();
          if (response.isSuccess) {
            this.template = response.result;
          }
          this.detector.detectChanges();
        });
      },
    });
  }
}
