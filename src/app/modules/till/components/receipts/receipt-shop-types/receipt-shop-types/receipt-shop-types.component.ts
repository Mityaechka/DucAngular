import { ReceiptTemplatesService } from 'src/app/services/receipt-templates.service';
import { DialogsService } from './../../../../../../services/dialogs.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from 'src/app/modules/table/table/table.component';
import { ReceiptShopTypeCreateComponent } from '../receipt-shop-type-create/receipt-shop-type-create.component';
import { ReceiptShopTypeEditComponent } from '../receipt-shop-type-edit/receipt-shop-type-edit.component';

@Component({
  selector: 'app-receipt-shop-types',
  templateUrl: './receipt-shop-types.component.html',
  styleUrls: ['./receipt-shop-types.component.css'],
})
export class ReceiptShopTypesComponent implements OnInit {
  @ViewChild('table') table: TableComponent<any>;

  constructor(
    private detector: ChangeDetectorRef,
    private dialogs: DialogsService,
    private receiptTemplatesService: ReceiptTemplatesService
  ) {}

  ngOnInit(): void {}
  async loadData() {
    return await this.receiptTemplatesService.getShopReceiptTypes();
  }
  create() {
    this.dialogs.push({
      component: ReceiptShopTypeCreateComponent,
      onInstance: (i) => {
        i.created.subscribe(() => this.table.loadData());
      },
    });
  }
  edit(id: number) {
    this.dialogs.push({
      component: ReceiptShopTypeEditComponent,
      data: id,
      onInstance: (i) => {
        i.edited.subscribe(() => this.table.loadData());
      },
    });
  }
}
