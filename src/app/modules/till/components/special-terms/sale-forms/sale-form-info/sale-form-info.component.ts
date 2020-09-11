import { SaleFormsService } from 'src/app/services/sale-forms.service';
import { TableService } from './../../../../../../services/table.service';
import { SaleFormEditComponent } from './../sale-form-edit/sale-form-edit.component';
import { DialogsService } from 'src/app/services/dialogs.service';
import { SaleForm } from './../../../../../../entities/sale-form.entity';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-sale-form-info',
  templateUrl: './sale-form-info.component.html',
  styleUrls: ['./sale-form-info.component.css'],
})
export class SaleFormInfoComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public saleForm: SaleForm,
    private dialogs: DialogsService,
    private tableService: TableService,
    private saleFormsService: SaleFormsService,
    private detector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}
  async editSaleForm() {
    this.dialogs.push({
      component: SaleFormEditComponent,
      data: this.saleForm,
      config: { width: '500px' },
      onInstance: (instance) => {
        instance.saleFormEdited.subscribe(async (saleFormId) => {
          //this.dialogs.pop();
          this.dialogs.startLoading();
          this.tableService.tables.forEach((x) => x.table.loadDataEvent());
          const saleFormResponse = await this.saleFormsService.getSaleForm(
            saleFormId
          );
          this.dialogs.stopLoading();
          this.saleForm = Object.assign(
            new SaleForm(),
            saleFormResponse.result
          );
          this.detector.detectChanges();
        });
      },
    });
  }
}
