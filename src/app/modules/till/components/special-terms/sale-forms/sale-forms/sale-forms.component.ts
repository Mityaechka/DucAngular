import { EnumDisplayCollection } from './../../../../../../enums/enum-display.collection';
import { TableComponent } from './../../../../../table/table/table.component';
import { ShopsSelectComponent } from './../../../shop/shops-select/shops-select.component';
import { SaleForm } from './../../../../../../entities/sale-form.entity';
import { SaleFormInfoComponent } from './../sale-form-info/sale-form-info.component';
import { TableService } from './../../../../../../services/table.service';
import { SaleFormCreateComponent } from './../sale-form-create/sale-form-create.component';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { SaleFormsService } from 'src/app/services/sale-forms.service';
import { DialogsService } from 'src/app/services/dialogs.service';
import {
  SelecеtionForm,
  SelecеtionFormDisplay,
} from 'src/app/enums/selection-form.enum';

@Component({
  selector: 'app-sale-forms',
  templateUrl: './sale-forms.component.html',
  styleUrls: ['./sale-forms.component.css'],
})
export class SaleFormsComponent implements OnInit {
  EnumDisplayCollection = EnumDisplayCollection;
  public selecеtionForm: typeof SelecеtionForm;
  SelecеtionFormDisplay = SelecеtionFormDisplay;
  @ViewChild('table')
  table: TableComponent<SaleForm>;
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
          this.tableService.tables.forEach((x) => x.table.loadData());
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
  async setState(saleForm: SaleForm, state: boolean) {
    this.dialogs.startLoading();
    const response = await this.saleformsService.setSaleFormIsActive(
      saleForm.id,
      state
    );
    this.dialogs.stopLoading();
    if (response.isSuccess) {
      this.table.loadData();
    } else {
      this.dialogs.pushAlert(response.errorMessage);
    }
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
