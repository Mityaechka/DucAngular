
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipesModule } from './../pipes/pipes.module';
import { CommonComponentsModule } from './../common-components/common-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TillRoutingModule } from './till-routing.module';
import { MainTillComponent } from './components/main-till/main-till.component';
import { ProviderRequestsComponent } from './components/provider/provider-requests/provider-requests.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableModule } from '../table/table.module';
import { ProviderRequestInfoComponent } from './components/provider/provider-request-info/provider-request-info.component';
import { ProviderRequestConfirmComponent } from './components/provider/provider-request-confirm/provider-request-confirm.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { SellerRequestsComponent } from './components/seller/seller-requests/seller-requests.component';
import { SellerRequestInfoComponent } from './components/seller/seller-request-info/seller-request-info.component';
import { LogisticRequestsComponent } from './components/logistic/logistic-requests/logistic-requests.component';
import { LogisticRequestInfoComponent } from './components/logistic/logistic-request-info/logistic-request-info.component';
import { SellerCreateRequestComponent } from './components/seller/seller-create-request/seller-create-request.component';
import { SellerCreateRequestDialogComponent } from './components/seller/seller-create-request-dialog/seller-create-request-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SellerRequestShowCodeComponent } from './components/seller/seller-request-show-code/seller-request-show-code.component';
import { LogisticRequestConfirmComponent } from './components/logistic/logistic-request-confirm/logistic-request-confirm.component';
import { LogisticRequestShippComponent } from './components/logistic/logistic-request-shipp/logistic-request-shipp.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ShopLeftsSellComponent } from './components/shop/shop-lefts-sell/shop-lefts-sell.component';
import { ShopProductsComponent } from './components/shop/shop-products/shop-products.component';
import { ShopLeftSellComponent } from './components/shop/shop-left-sell/shop-left-sell.component';
import { ShopLeftsComponent } from './components/shop/shop-lefts/shop-lefts.component';
import { ShopLeftInfoComponent } from './components/shop/shop-left-info/shop-left-info.component';
import { ShopLeftChangePriceComponent } from './components/shop/shop-left-change-price/shop-left-change-price.component';
import { SaleFormsComponent } from './components/special-terms/sale-forms/sale-forms/sale-forms.component';
import { SaleFormCreateComponent } from './components/special-terms/sale-forms/sale-form-create/sale-form-create.component';
import { SaleFormInfoComponent } from './components/special-terms/sale-forms/sale-form-info/sale-form-info.component';
import { SaleFormEditComponent } from './components/special-terms/sale-forms/sale-form-edit/sale-form-edit.component';
import { CashPeriodCurrentComponent } from './components/cash/cash-period/cash-period-current/cash-period-current.component';
import { CashPeriodOpenNewComponent } from './components/cash/cash-period/cash-period-open-new/cash-period-open-new.component';
import { CashPeriodCollectCashComponent } from './components/cash/cash-period/cash-period-collect-cash/cash-period-collect-cash.component';
import { CashPeriodsComponent } from './components/cash/cash-period/cash-periods/cash-periods.component';
import { MoneyTransfersComponent } from './components/cash/money-transfer/money-transfers/money-transfers.component';
import { FromNotTransferedComponent } from './components/cash/money-transfer/from-not-transfered/from-not-transfered.component';
import { ToNotTransferedComponent } from './components/cash/money-transfer/to-not-transfered/to-not-transfered.component';
import { SupplyDebtsComponent } from './components/cash/supply-debt/supply-debts/supply-debts.component';
import { SupplyDebtsDebtorComponent } from './components/cash/supply-debt/supply-debts-debtor/supply-debts-debtor.component';
import { SupplyDebtsOwnerComponent } from './components/cash/supply-debt/supply-debts-owner/supply-debts-owner.component';
import { SupplyDebtBindDriverComponent } from './components/cash/supply-debt/supply-debt-bind-driver/supply-debt-bind-driver.component';
import { SupplyDebtActivePayRequestComponent } from './components/cash/supply-debt/supply-debt-active-pay-request/supply-debt-active-pay-request.component';
import { SupplyDebtPayRequestCodeComponent } from './components/cash/supply-debt/supply-debt-pay-request-code/supply-debt-pay-request-code.component';
import { SupplyDebtActivePayRequestTakeComponent } from './components/cash/supply-debt/supply-debt-active-pay-request-take/supply-debt-active-pay-request-take.component';
import { SupplyDebtsDriverComponent } from './components/cash/supply-debt/supply-debts-driver/supply-debts-driver.component';
import { ShopAboutComponent } from './components/shop-control/shop-about/shop-about.component';
import { CasherPlacesComponent } from './components/shop-control/casher-place/casher-places/casher-places.component';
import { CasherPlaceCreateComponent } from './components/shop-control/casher-place/casher-place-create/casher-place-create.component';
import { CasherPlaceInfoComponent } from './components/shop-control/casher-place/casher-place-info/casher-place-info.component';
import { ShopDepartamentCreateComponent } from './components/shop-control/shop-departament/shop-departament-create/shop-departament-create.component';
import { ShopDepartamentsComponent } from './components/shop-control/shop-departament/shop-departaments/shop-departaments.component';
import { ShopDepartamentInfoComponent } from './components/shop-control/shop-departament/shop-departament-info/shop-departament-info.component';
import { ShopStaffsComponent } from './components/shop-control/shop-staff/shop-staffs/shop-staffs.component';
import { ShopStaffCreateComponent } from './components/shop-control/shop-staff/shop-staff-create/shop-staff-create.component';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    MainTillComponent,
    ProviderRequestsComponent,
    ProviderRequestInfoComponent,
    ProviderRequestConfirmComponent,
    SellerRequestsComponent,
    SellerRequestInfoComponent,
    LogisticRequestsComponent,
    LogisticRequestInfoComponent,
    SellerCreateRequestComponent,
    SellerCreateRequestDialogComponent,
    SellerRequestShowCodeComponent,
    LogisticRequestConfirmComponent,
    LogisticRequestShippComponent,
    ShopLeftsSellComponent,
    ShopProductsComponent,
    ShopLeftSellComponent,
    ShopLeftsComponent,
    ShopLeftInfoComponent,
    ShopLeftChangePriceComponent,
    SaleFormsComponent,
    SaleFormCreateComponent,
    SaleFormInfoComponent,
    SaleFormEditComponent,
    CashPeriodCurrentComponent,
    CashPeriodOpenNewComponent,
    CashPeriodCollectCashComponent,
    CashPeriodsComponent,
    MoneyTransfersComponent,
    FromNotTransferedComponent,
    ToNotTransferedComponent,
    SupplyDebtsComponent,
    SupplyDebtsDebtorComponent,
    SupplyDebtsOwnerComponent,
    SupplyDebtBindDriverComponent,
    SupplyDebtActivePayRequestComponent,
    SupplyDebtPayRequestCodeComponent,
    SupplyDebtActivePayRequestTakeComponent,
    SupplyDebtsDriverComponent,
    CasherPlacesComponent,
    ShopDepartamentsComponent,
    ShopAboutComponent,
    CasherPlaceCreateComponent,
    CasherPlaceInfoComponent,
    ShopDepartamentCreateComponent,
    ShopDepartamentInfoComponent,
    ShopStaffsComponent,
    ShopStaffCreateComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    TableModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    CommonComponentsModule,
    PipesModule,
    FlexLayoutModule,
    MatStepperModule,
  ],
  exports: [MainTillComponent],
  entryComponents: [
    MainTillComponent,
    ProviderRequestsComponent,
    ProviderRequestInfoComponent,
    ProviderRequestConfirmComponent,
    SellerRequestsComponent,
    SellerRequestInfoComponent,
    LogisticRequestsComponent,
    LogisticRequestInfoComponent,
    SellerCreateRequestComponent,
    SellerCreateRequestDialogComponent,
    SellerRequestShowCodeComponent,
    LogisticRequestConfirmComponent,
    LogisticRequestShippComponent,
    ShopLeftsSellComponent,
    ShopProductsComponent,
    ShopLeftSellComponent,
    ShopLeftsComponent,
    ShopLeftInfoComponent,
    ShopLeftChangePriceComponent,
    SaleFormsComponent,
    SaleFormCreateComponent,
    SaleFormInfoComponent,
    SaleFormEditComponent,
    CashPeriodOpenNewComponent,
    CashPeriodCollectCashComponent,
    SupplyDebtBindDriverComponent,
    SupplyDebtActivePayRequestComponent,
    SupplyDebtPayRequestCodeComponent,
    SupplyDebtActivePayRequestTakeComponent,
    CasherPlaceCreateComponent,
    CasherPlaceInfoComponent,
    ShopDepartamentCreateComponent,
    ShopStaffCreateComponent
  ],
})
export class TillModule {}
