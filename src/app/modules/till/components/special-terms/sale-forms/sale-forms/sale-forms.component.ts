import { SaleForm } from './../../../../../../entities/sale-form.entity';
import { SaleFormInfoComponent } from './../sale-form-info/sale-form-info.component';
import { TableService } from './../../../../../../services/table.service';
import { ShopLeftInfoComponent } from './../../../shop/shop-left-info/shop-left-info.component';
import { SaleFormCreateComponent } from './../sale-form-create/sale-form-create.component';
import { Component, OnInit } from '@angular/core';
import { SaleFormsService } from 'src/app/services/sale-forms.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import { ProductRequest } from 'src/app/entities/product-request.entity';
import { ProviderRequestInfoComponent } from '../../../provider/provider-request-info/provider-request-info.component';
import { ProviderRequestConfirmComponent } from '../../../provider/provider-request-confirm/provider-request-confirm.component';
import {
  SelecеtionForm,
  SelecеtionFormDisplay,
} from 'src/app/enums/selection-form.enum';
import { isBuffer } from 'util';

@Component({
  selector: 'app-sale-forms',
  templateUrl: './sale-forms.component.html',
  styleUrls: ['./sale-forms.component.css'],
})
export class SaleFormsComponent implements OnInit {
  public selecеtionForm: typeof SelecеtionForm;
  SelecеtionFormDisplay = SelecеtionFormDisplay;
  displayedColumns: string[] = [
    'shop',
    'product',
    'canConsignment',
    'canImplement',
    'cash',
    'cashless',
  ];
  constructor(
    private saleformsService: SaleFormsService,
    private dialogs: DialogsService,
    private tableService: TableService
  ) {}

  async ngOnInit() {}
  async loadData() {
    return await this.saleformsService.getSaleForms();
  }
  createSaleForm() {
    this.dialogs.push({
      component: SaleFormCreateComponent,
      data: {},
      config: { width: '500px' },
      onInstance: (instance) => {
        instance.saleFormCreated.subscribe(async (saleFormId) => {
          //this.dialogs.pop();
          this.dialogs.startLoading();
          this.tableService.tables.forEach((x) => x.table.loadDataEvent());
          const saleFormResponse = await this.saleformsService.getSaleForm(
            saleFormId
          );
          this.dialogs.stopLoading();
          if (saleFormResponse.isSuccess) {
            this.showSaleForm(saleFormResponse.result);
          }
        });
      },
    });
  }
  async saleFormRowClick(saleForm: SaleForm) {
    this.dialogs.startLoading();
    const saleFormResponse = await this.saleformsService.getSaleForm(
      saleForm.id
    );
    this.dialogs.stopLoading();
    if (saleFormResponse.isSuccess) {
      this.showSaleForm(saleFormResponse.result);
    }
  }
  showSaleForm(saleForm: SaleForm) {
    this.dialogs.push({
      component: SaleFormInfoComponent,
      data: Object.assign(new SaleForm(), saleForm),
      config: { width: '500px' },
    });
  }
  // async selectRequest(request: ProductRequest) {
  //   this.dialogs.startLoading();
  //   const response = await this.requestService.getProviderRequest(request.id);
  //   this.dialogs.stopLoading();
  //   if (response.isSuccess) {
  //     if (response.result.isTransferredToLogistic) {
  //       this.dialogs.push({ component: ProviderRequestInfoComponent });
  //     } else {
  //       this.dialogs.push({ component: ProviderRequestConfirmComponent,data:response.result });
  //     }
  //   } else {
  //     this.dialogs.pushAlert(response.errorMessage);
  //   }
  // }
}
