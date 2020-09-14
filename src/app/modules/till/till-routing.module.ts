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

export const tillRoutes: Routes = [
  { path: 'provider/requests', component: ProviderRequestsComponent },
  { path: 'seller/requests', component: SellerRequestsComponent },
  { path: 'seller/requests/create', component: SellerCreateRequestComponent },
  { path: 'logistic/requests', component: LogisticRequestsComponent },
  {
    path: 'special-terms',
    children: [{ path: 'sale-forms', component: SaleFormsComponent }],
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tillRoutes)],
  exports: [RouterModule],
})
export class TillRoutingModule {}
