import { MatDialogRef } from '@angular/material/dialog';
import { TableComponent } from 'src/app/modules/table/table/table.component';
import { ReceiptTemplateInfoComponent } from './../receipt-template-info/receipt-template-info.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ReceiptTemplate } from 'src/app/entities/receipt-template/receipt-template.entiry';
import { ReceiptTemplateCreateComponent } from '../receipt-template-create/receipt-template-create.component';
import { ReceiptTemplatesService } from 'src/app/services/receipt-templates.service';

@Component({
  selector: 'app-receipt-templates',
  templateUrl: './receipt-templates.component.html',
  styleUrls: ['./receipt-templates.component.css'],
})
export class ReceiptTemplatesComponent implements OnInit {
  @ViewChild('table') table: TableComponent<any>;
  constructor(
    private receiptTemplatesService: ReceiptTemplatesService,
    private dialogs: DialogsService,

  ) {}

  async ngOnInit() {

  }
  async loadData() {
    return this.receiptTemplatesService.getTemplates();
  }
  select(template: ReceiptTemplate) {
    this.dialogs.push({
      component: ReceiptTemplateInfoComponent,
      data: template,
      onInstance: (i) => {
        i.edited.subscribe(() => this.table.loadData());
      },
    });
  }
  create() {
    this.dialogs.push({
      component: ReceiptTemplateCreateComponent,
      onInstance: (i) => {
        i.created.subscribe(() => this.table.loadData());
      },
    });
  }
}
