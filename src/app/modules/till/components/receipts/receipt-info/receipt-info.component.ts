import { EnumDisplayCollection } from './../../../../../enums/enum-display.collection';
import { ReceiptService } from './../../../../../services/receipt.service';
import { Receipt } from './../../../../../entities/receipt.entity';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ReceiptPrintPreviewComponent } from '../receipt-print-preview/receipt-print-preview.component';

@Component({
  selector: 'app-receipt-info',
  templateUrl: './receipt-info.component.html',
  styleUrls: ['./receipt-info.component.css'],
})
export class ReceiptInfoComponent implements OnInit {
  EnumDisplayCollection = EnumDisplayCollection;
  constructor(
    @Inject(MAT_DIALOG_DATA) public receipt: Receipt,
    private detector: ChangeDetectorRef,
    private dialogs: DialogsService,
    private receiptService: ReceiptService
  ) {}

  async ngOnInit() {
    this.dialogs.startLoading();
    const response = await this.receiptService.getReceipt(this.receipt.id);
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.receipt = response.result;
    }
    this.detector.detectChanges();
  }
  print() {
    this.dialogs.push({
      component: ReceiptPrintPreviewComponent,
      data: this.receipt,
    });
  }
}
