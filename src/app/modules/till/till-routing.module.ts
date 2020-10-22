import { ReceiptShopTypesComponent } from './components/receipts/receipt-shop-types/receipt-shop-types/receipt-shop-types.component';
import { ProviderShopsComponent } from './components/requests/provider-shops/provider-shops.component';
import { RetroBonusObligationsComponent } from './components/cash/retro-bonus-obligation/retro-bonus-obligations/retro-bonus-obligations.component';
import { RetroBonusesComponent } from './components/special-terms/retro-bonuses/retro-bonuses/retro-bonuses.component';
import { RetroBonusCreateComponent } from './components/special-terms/retro-bonuses/retro-bonus-create/retro-bonus-create.component';
import { TillNotFoundComponent } from './components/till-not-found/till-not-found.component';
import { TillWelcomeComponent } from './components/till-welcome/till-welcome.component';
import { ShopPromotionsComponent } from './components/shop/shop-promotion/shop-promotions/shop-promotions.component';
import { ShopAboutComponent } from './components/shop-control/shop-about/shop-about.component';
import { ShopDepartamentsComponent } from './components/shop-control/shop-departament/shop-departaments/shop-departaments.component';
import { CasherPlacesComponent } from './components/shop-control/casher-place/casher-places/casher-places.component';
import { SupplyDebtsComponent } from './components/cash/supply-debt/supply-debts/supply-debts.component';
import { MoneyTransfersComponent } from './components/cash/money-transfer/money-transfers/money-transfers.component';
import { CashPeriodsComponent } from './components/cash/cash-period/cash-periods/cash-periods.component';
import { SaleFormsComponent } from './components/special-terms/sale-forms/sale-forms/sale-forms.component';
import { SellerCreateRequestComponent } from './components/seller/seller-create-request/seller-create-request.component';
import { SellerRequestsComponent } from './components/seller/seller-requests/seller-requests.component';
import { ProviderRequestsComponent } from './components/provider/provider-requests/provider-requests.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogisticRequestsComponent } from './components/logistic/logistic-requests/logistic-requests.component';
import { CashPeriodCurrentComponent } from './components/cash/cash-period/cash-period-current/cash-period-current.component';
import { ShopStaffsComponent } from './components/shop-control/shop-staff/shop-staffs/shop-staffs.component';
import { ProductAttributesComponent } from './components/shop/product-attribute/product-attributes/product-attributes.component';
import { ShopLeftsSellComponent } from './components/shop/shop-left/shop-lefts-sell/shop-lefts-sell.component';
import { ShopLeftsComponent } from './components/shop/shop-left/shop-lefts/shop-lefts.component';
import { ShopProductsComponent } from './components/shop/shop-product/shop-products/shop-products.component';
import { ShopGroupsComponent } from './components/groups/shops/shop-groups/shop-groups.component';
import { ProductGroupsComponent } from './components/groups/products/product-groups/product-groups.component';
import { ProductTypeTreeComponent } from './components/product-type/product-type-tree/product-type-tree.component';
import { DirectDiscountsComponent } from './components/special-terms/direct-discounts/direct-discounts/direct-discounts.component';
import { ReceiptTemplatesComponent } from './components/receipts/receipt-template/receipt-templates/receipt-templates.component';

export const tillRoutes: Routes = [
  { path: '', component: TillWelcomeComponent },
  { path: 'provider/requests', component: ProviderRequestsComponent },
  { path: 'seller/requests', component: SellerRequestsComponent },
  { path: 'seller/requests/create', component: SellerCreateRequestComponent },
  { path: 'seller/requests/create2', component: ProviderShopsComponent },
  { path: 'logistic/requests', component: LogisticRequestsComponent },
  {
    path: 'special-terms',
    children: [
      { path: 'sale-forms', component: SaleFormsComponent },
      { path: 'direct-discounts', component: DirectDiscountsComponent },
      { path: 'retro-bonuses', component: RetroBonusesComponent },
    ],
  },
  {
    path: 'cash',
    children: [
      { path: 'cash-periods', component: CashPeriodsComponent },
      {
        path: 'cash-periods/current',
        component: CashPeriodCurrentComponent,
      },
      { path: 'money-transfers', component: MoneyTransfersComponent },
      { path: 'supply-debts', component: SupplyDebtsComponent },
      { path: 'retro-bonuses', component: RetroBonusObligationsComponent },
    ],
  },
  {
    path: 'shop',
    children: [
      { path: 'casher-places', component: CasherPlacesComponent },
      { path: 'departaments', component: ShopDepartamentsComponent },
      { path: 'staff', component: ShopStaffsComponent },
      { path: 'about', component: ShopAboutComponent },
      { path: 'lefts', component: ShopLeftsComponent },
      { path: 'lefts/sell', component: ShopLeftsSellComponent },
      { path: 'products', component: ShopProductsComponent },
      { path: 'attributes', component: ProductAttributesComponent },
      { path: 'promotions', component: ShopPromotionsComponent },
      { path: 'product-types', component: ProductTypeTreeComponent },
    ],
  },
  {
    path: 'groups',
    children: [
      {
        path: 'shops',
        children: [{ path: '', component: ShopGroupsComponent }],
      },
      {
        path: 'products',
        children: [{ path: '', component: ProductGroupsComponent }],
      },
    ],
  },
  { path: 'receipts/templates', component: ReceiptTemplatesComponent },
  { path: 'receipts/operations', component: ReceiptShopTypesComponent },
  { path: '**', component: TillNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(tillRoutes)],
  exports: [RouterModule],
})
export class TillRoutingModule {}
