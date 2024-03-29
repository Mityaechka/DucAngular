import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { ReceiptEditorModule } from './../receipt-editor/receipt-editor.module';
import { DirectivesModule } from './../directives/directives.module';
import { DirectDiscountsComponent } from './components/special-terms/direct-discounts/direct-discounts/direct-discounts.component';

import { ShopLeftSelectComponent } from './components/shop/shop-left/shop-left-select/shop-left-select.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipesModule } from './../pipes/pipes.module';
import { CommonComponentsModule } from './../common-components/common-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TableModule } from '../table/table.module';
import { ProviderRequestInfoComponent } from './components/provider/provider-request-info/provider-request-info.component';
import { ProviderRequestConfirmComponent } from './components/provider/provider-request-confirm/provider-request-confirm.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SellerRequestsComponent } from './components/seller/seller-requests/seller-requests.component';
import { SellerRequestInfoComponent } from './components/seller/seller-request-info/seller-request-info.component';
import { LogisticRequestsComponent } from './components/logistic/logistic-requests/logistic-requests.component';
import { LogisticRequestInfoComponent } from './components/logistic/logistic-request-info/logistic-request-info.component';
import { SellerCreateRequestComponent } from './components/seller/seller-create-request/seller-create-request.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SellerRequestShowCodeComponent } from './components/seller/seller-request-show-code/seller-request-show-code.component';
import { LogisticRequestConfirmComponent } from './components/logistic/logistic-request-confirm/logistic-request-confirm.component';
import { LogisticRequestShippComponent } from './components/logistic/logistic-request-shipp/logistic-request-shipp.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ProductAttributeSelectComponent } from './components/shop/product-attribute/product-attribute-select/product-attribute-select.component';
import { ShopProductArrivingComponent } from './components/shop/shop-product/shop-product-arriving/shop-product-arriving.component';
import { ProductAttributesComponent } from './components/shop/product-attribute/product-attributes/product-attributes.component';
import { ProductAttributeCreateComponent } from './components/shop/product-attribute/product-attribute-create/product-attribute-create.component';
import { ProductAttributeInfoComponent } from './components/shop/product-attribute/product-attribute-info/product-attribute-info.component';
import { ShopProductCreateComponent } from './components/shop/shop-product/shop-product-create/shop-product-create.component';
import { ShopProductEditComponent } from './components/shop/shop-product/shop-product-edit/shop-product-edit.component';
import { ShopProductInfoComponent } from './components/shop/shop-product/shop-product-info/shop-product-info.component';
import { ShopLeftChangePriceComponent } from './components/shop/shop-left/shop-left-change-price/shop-left-change-price.component';
import { ShopLeftInfoComponent } from './components/shop/shop-left/shop-left-info/shop-left-info.component';
import { ShopLeftSellComponent } from './components/shop/shop-left/shop-left-sell/shop-left-sell.component';
import { ShopLeftsSellComponent } from './components/shop/shop-left/shop-lefts-sell/shop-lefts-sell.component';
import { ShopLeftsComponent } from './components/shop/shop-left/shop-lefts/shop-lefts.component';
import { ShopProductsComponent } from './components/shop/shop-product/shop-products/shop-products.component';
import { ProductAttributeEditComponent } from './components/shop/product-attribute/product-attribute-edit/product-attribute-edit.component';
import { ShopPromotionsComponent } from './components/shop/shop-promotion/shop-promotions/shop-promotions.component';
import { ShopPromotionCreateComponent } from './components/shop/shop-promotion/shop-promotion-create/shop-promotion-create.component';
// tslint:disable-next-line: max-line-length
import { SellerCreateRequestDialogComponent } from './components/seller/seller-create-request-dialog/seller-create-request-dialog.component';
import { ShopPromotionInfoComponent } from './components/shop/shop-promotion/shop-promotion-info/shop-promotion-info.component';
import { ShopPromotionEditComponent } from './components/shop/shop-promotion/shop-promotion-edit/shop-promotion-edit.component';
import { ShopGroupsComponent } from './components/groups/shops/shop-groups/shop-groups.component';
import { ShopGroupCreateComponent } from './components/groups/shops/shop-group-create/shop-group-create.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ShopGroupInfoComponent } from './components/groups/shops/shop-group-info/shop-group-info.component';
import { ShopsSelectComponent } from './components/shop/shops-select/shops-select.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProductGroupsComponent } from './components/groups/products/product-groups/product-groups.component';
import { ProductGroupInfoComponent } from './components/groups/products/product-group-info/product-group-info.component';
import { ProductGroupCreateComponent } from './components/groups/products/product-group-create/product-group-create.component';
import { ShopProductSelectComponent } from './components/shop/shop-product/shop-product-select/shop-product-select.component';
import { CurrentShopSelectComponent } from './components/current-shop-select/current-shop-select.component';
import { TillWelcomeComponent } from './components/till-welcome/till-welcome.component';
import { TillNotFoundComponent } from './components/till-not-found/till-not-found.component';
import { ProductTypeSelectComponent } from './components/product-type/product-type-select/product-type-select.component';
import {MatTreeModule} from '@angular/material/tree';
import { ProductTypeCreateComponent } from './components/product-type/product-type-create/product-type-create.component';
import { ProductTypeTreeComponent } from './components/product-type/product-type-tree/product-type-tree.component';
import { ShopSelectInputComponent } from './components/shop/shop-select-input/shop-select-input.component';
import { ShopProductSelectInputComponent } from './components/shop/shop-product/shop-product-select-input/shop-product-select-input.component';
import { DirectDiscountCreateComponent } from './components/special-terms/direct-discounts/direct-discount-create/direct-discount-create.component';
import { MatSelectModule } from '@angular/material/select';
import { DirectDiscountInfoComponent } from './components/special-terms/direct-discounts/direct-discount-info/direct-discount-info.component';
import { DirectDiscountEditComponent } from './components/special-terms/direct-discounts/direct-discount-edit/direct-discount-edit.component';
import { RetroBonusesComponent } from './components/special-terms/retro-bonuses/retro-bonuses/retro-bonuses.component';
import { RetroBonusCreateComponent } from './components/special-terms/retro-bonuses/retro-bonus-create/retro-bonus-create.component';
import { RetroBonusInfoComponent } from './components/special-terms/retro-bonuses/retro-bonus-info/retro-bonus-info.component';
import { RetroBonusEditComponent } from './components/special-terms/retro-bonuses/retro-bonus-edit/retro-bonus-edit.component';
import { RetroBonusObligationsComponent } from './components/cash/retro-bonus-obligation/retro-bonus-obligations/retro-bonus-obligations.component';
import { RetroBonusObligationsOwnerComponent } from './components/cash/retro-bonus-obligation/retro-bonus-obligations-owner/retro-bonus-obligations-owner.component';
import { RetroBonusObligationsReceiverComponent } from './components/cash/retro-bonus-obligation/retro-bonus-obligations-receiver/retro-bonus-obligations-receiver.component';
import { RetroBonusConditionComponent } from './components/special-terms/retro-bonuses/retro-bonus-condition/retro-bonus-condition.component';
import { RetroBonusObligationOwnerInfoComponent } from './components/cash/retro-bonus-obligation/retro-bonus-obligation-owner-info/retro-bonus-obligation-owner-info.component';
import { RetroBonusObligationsReceiverInfoComponent } from './components/cash/retro-bonus-obligation/retro-bonus-obligations-receiver-info/retro-bonus-obligations-receiver-info.component';
import { ProviderShopsComponent } from './components/requests/provider-shops/provider-shops.component';
import { ProviderCreateRequestComponent } from './components/requests/provider-create-request/provider-create-request.component';
import { ProviderSelectProductComponent } from './components/requests/provider-select-product/provider-select-product.component';
import { ProviderRequstConfirmCountComponent } from './components/provider/provider-request-confirm-count/provider-request-confirm-count.component';
import { ReceiptTemplatesComponent } from './components/receipts/receipt-template/receipt-templates/receipt-templates.component';
import { ReceiptTemplateInfoComponent } from './components/receipts/receipt-template/receipt-template-info/receipt-template-info.component';
import { ReceiptTemplateCreateComponent } from './components/receipts/receipt-template/receipt-template-create/receipt-template-create.component';
import { ReceiptTemplateEditComponent } from './components/receipts/receipt-template/receipt-template-edit/receipt-template-edit.component';
import { ReceiptShopTypesComponent } from './components/receipts/receipt-shop-types/receipt-shop-types/receipt-shop-types.component';
import { ReceiptShopTypeCreateComponent } from './components/receipts/receipt-shop-types/receipt-shop-type-create/receipt-shop-type-create.component';
import { ReceiptShopTypeEditComponent } from './components/receipts/receipt-shop-types/receipt-shop-type-edit/receipt-shop-type-edit.component';
import { ReceiptInfoComponent } from './components/receipts/receipt-info/receipt-info.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReceiptPrintPreviewComponent } from './components/receipts/receipt-print-preview/receipt-print-preview.component';
import { CashPeriodInfoComponent } from './components/cash/cash-period/cash-period-info/cash-period-info.component';
import { CashPeriodReceiptsTableComponent } from './components/cash/cash-period/cash-period-receipts-table/cash-period-receipts-table.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { PermanentNotificationsComponent } from './components/permanent-notifications/permanent-notifications/permanent-notifications.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ShopProductsImportComponent } from './components/shop/shop-product/shop-products-import/shop-products-import.component';


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
    ShopProductCreateComponent,
    ProductAttributeSelectComponent,
    ShopProductArrivingComponent,
    ShopProductInfoComponent,
    ShopProductEditComponent,
    ProductAttributesComponent,
    ProductAttributeCreateComponent,
    ProductAttributeInfoComponent,
    ProductAttributeEditComponent,
    ShopPromotionsComponent,
    ShopPromotionCreateComponent,
    ShopLeftSelectComponent,
    ShopPromotionInfoComponent,
    ShopPromotionEditComponent,
    ShopGroupsComponent,
    ShopGroupCreateComponent,
    ShopGroupInfoComponent,
    ShopsSelectComponent,
    ProductGroupsComponent,
    ProductGroupInfoComponent,
    ProductGroupCreateComponent,
    ShopProductSelectComponent,
    CurrentShopSelectComponent,
    TillWelcomeComponent,
    TillNotFoundComponent,
    ProductTypeSelectComponent,
    ProductTypeCreateComponent,
    ProductTypeTreeComponent,
    ShopSelectInputComponent,
    DirectDiscountCreateComponent,
    DirectDiscountsComponent,
    ShopProductSelectInputComponent,
    DirectDiscountInfoComponent,
    DirectDiscountEditComponent,
    RetroBonusesComponent,
    RetroBonusCreateComponent,
    RetroBonusInfoComponent,
    RetroBonusEditComponent,
    RetroBonusObligationsComponent,
    RetroBonusObligationsOwnerComponent,
    RetroBonusObligationsReceiverComponent,
    RetroBonusConditionComponent,
    RetroBonusObligationOwnerInfoComponent,
    RetroBonusObligationsReceiverInfoComponent,
    ProviderShopsComponent,
    ProviderCreateRequestComponent,
    ProviderSelectProductComponent,
    ProviderRequstConfirmCountComponent,
    ReceiptTemplatesComponent,
    ReceiptTemplateInfoComponent,
    ReceiptTemplateCreateComponent,
    ReceiptTemplateEditComponent,
    ReceiptShopTypesComponent,
    ReceiptShopTypeCreateComponent,
    ReceiptShopTypeEditComponent,
    ReceiptInfoComponent,
    ReceiptPrintPreviewComponent,
    CashPeriodInfoComponent,
    CashPeriodReceiptsTableComponent,
    PermanentNotificationsComponent,
    ShopProductsImportComponent
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
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    CommonComponentsModule,
    PipesModule,
    FlexLayoutModule,
    MatStepperModule,
    MaterialFileInputModule,
    NgxMatSelectSearchModule,
    MatTooltipModule,
    MatTreeModule,
    DirectivesModule,
    ReceiptEditorModule,
    OverlayModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
    MatProgressBarModule,
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
    ShopStaffCreateComponent,
    ShopProductCreateComponent,
    ProductAttributeSelectComponent,
    ShopProductArrivingComponent,
    ShopProductInfoComponent,
    ShopProductEditComponent,
    ProductAttributeCreateComponent,
    ProductAttributeInfoComponent,
    ProductAttributeEditComponent,
    ShopPromotionCreateComponent,
    ShopLeftSelectComponent,
    ShopPromotionInfoComponent,
    ShopProductEditComponent,
    ShopPromotionEditComponent,
    ShopGroupCreateComponent,
    ShopGroupInfoComponent,
    ShopsSelectComponent,
    ProductGroupCreateComponent,
    ProductGroupInfoComponent,
    ShopProductSelectComponent,
    CurrentShopSelectComponent,
    ProductTypeCreateComponent,
    DirectDiscountCreateComponent,
    DirectDiscountInfoComponent,
    DirectDiscountEditComponent,
    RetroBonusCreateComponent,
    RetroBonusInfoComponent,
    RetroBonusEditComponent,
    RetroBonusObligationOwnerInfoComponent,
    RetroBonusObligationsReceiverInfoComponent,
    ProviderCreateRequestComponent,
    ProviderSelectProductComponent,
    ProviderRequstConfirmCountComponent,
    ReceiptTemplateInfoComponent,
    ReceiptTemplateCreateComponent,
    ReceiptTemplateEditComponent,
    ReceiptShopTypeCreateComponent,
    ReceiptShopTypeEditComponent,
    ReceiptInfoComponent,
    ReceiptPrintPreviewComponent,
    CashPeriodInfoComponent
  ],
})
export class TillModule {

}
