import { ReceiptPreviewComponent } from 'src/app/modules/receipt-editor/components/receipt-preview/receipt-preview.component';
import { ReceiptFieldFactory } from './../../../../receipt-editor/models/receipt-field.model';
import { ReceiptService } from './../../../../../services/receipt.service';
import { Receipt } from 'src/app/entities/receipt.entity';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DialogsService } from 'src/app/services/dialogs.service';

@Component({
  selector: 'app-receipt-print-preview',
  templateUrl: './receipt-print-preview.component.html',
  styleUrls: ['./receipt-print-preview.component.css'],
})
export class ReceiptPrintPreviewComponent implements OnInit {
  template: {
    type: string;
    data: any;
  }[];
  @ViewChild(ReceiptPreviewComponent) preview: ReceiptPreviewComponent;
  constructor(
    @Inject(MAT_DIALOG_DATA) public receipt: Receipt,
    private detector: ChangeDetectorRef,
    private dialogs: DialogsService,
    private receiptService: ReceiptService
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const response = await this.receiptService.getReceiptPrintData(
      this.receipt.id
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.template = ReceiptFieldFactory.prepareTemplate(
        this.receipt.receiptTemplate.receiptFields,
        response.result
      );
    }
    this.detector.detectChanges();
  }
  print(){
    this.preview.print();
  }
}
