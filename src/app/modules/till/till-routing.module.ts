import { ShopProductsImportComponent } from './components/shop/shop-product/shop-products-import/shop-products-import.component';
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
import { RouteNames } from 'src/app/models/route-names.model';
import { Route } from '@angular/compiler/src/core';

export const tillRoutes: Routes = [
  { path: '', component: TillWelcomeComponent, data: { name: 'DUC' } },
  {
    path: 'provider/requests',
    component: ProviderRequestsComponent,
    data: { name: '' },
  },
  {
    path: 'seller/requests',
    component: SellerRequestsComponent,
    data: { name: '' },
  },
  {
    path: 'seller/requests/create',
    component: SellerCreateRequestComponent,
    data: { name: '' },
  },
  {
    path: 'seller/requests/create2',
    component: ProviderShopsComponent,
    data: { name: '' },
  },
  {
    path: 'logistic/requests',
    component: LogisticRequestsComponent,
    data: { name: '' },
  },
  {
    path: 'special-terms',
    children: [
      { path: 'sale-forms', component: SaleFormsComponent, data: { name: '' } },
      {
        path: 'direct-discounts',
        component: DirectDiscountsComponent,
        data: { name: '' },
      },
      {
        path: 'retro-bonuses',
        component: RetroBonusesComponent,
        data: { name: '' },
      },
    ],
  },
  {
    path: 'cash',
    children: [
      {
        path: 'cash-periods',
        component: CashPeriodsComponent,
        data: { name: '' },
      },
      {
        path: 'cash-periods/current',
        component: CashPeriodCurrentComponent,
        data: { name: '' },
      },
      {
        path: 'money-transfers',
        component: MoneyTransfersComponent,
        data: { name: '' },
      },
      {
        path: 'supply-debts',
        component: SupplyDebtsComponent,
        data: { name: '' },
      },
      {
        path: 'retro-bonuses',
        component: RetroBonusObligationsComponent,
        data: { name: '' },
      },
    ],
  },
  {
    path: 'shop',
    children: [
      {
        path: 'casher-places',
        component: CasherPlacesComponent,
        data: { name: '' },
      },
      {
        path: 'departaments',
        component: ShopDepartamentsComponent,
        data: { name: '' },
      },
      { path: 'staff', component: ShopStaffsComponent, data: { name: '' } },
      { path: 'about', component: ShopAboutComponent, data: { name: '' } },
      { path: 'lefts', component: ShopLeftsComponent, data: { name: '' } },
      {
        path: 'lefts/sell',
        component: ShopLeftsSellComponent,
        data: { name: 'Продажа товаров', data: { name: '' } },
      },
      {
        path: 'products',
        component: ShopProductsComponent,
        data: { name: '' },
      },
      {
        path: 'products/import',
        component: ShopProductsImportComponent,
        data: { name: 'Импорт продуктов' },
      },
      {
        path: 'attributes',
        component: ProductAttributesComponent,
        data: { name: '' },
      },
      {
        path: 'promotions',
        component: ShopPromotionsComponent,
        data: { name: '' },
      },
      {
        path: 'product-types',
        component: ProductTypeTreeComponent,
        data: { name: '' },
      },
    ],
  },
  {
    path: 'groups',
    children: [
      {
        path: 'shops',
        children: [
          { path: '', component: ShopGroupsComponent, data: { name: '' } },
        ],
      },
      {
        path: 'products',
        children: [
          { path: '', component: ProductGroupsComponent, data: { name: '' } },
        ],
      },
    ],
  },
  {
    path: 'receipts/templates',
    component: ReceiptTemplatesComponent,
    data: { name: '' },
  },
  {
    path: 'receipts/operations',
    component: ReceiptShopTypesComponent,
    data: { name: '' },
  },
  { path: '**', component: TillNotFoundComponent },
];
tillRoutes.forEach((route) => {
  addRoute(route);
});
@NgModule({
  imports: [RouterModule.forChild(tillRoutes)],
  exports: [RouterModule],
})
export class TillRoutingModule {}

function addRoute(route, parentName: string[] = ['/till']) {
  if (route.data && route.data.name) {
    RouteNames.routeNamesObject.push({
      title: route.data.name,
      path: parentName.join('/') + `/${route.path}`,
    });
  }
  route.children?.forEach((r) => addRoute(r, [...parentName, route.path]));
}
