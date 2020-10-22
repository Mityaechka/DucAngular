import { SaleFormType } from './../enums/sale-form-type.enum';
import { ProductLeft } from './product-left.entity';
import { Shop } from './shop.entity';
import { SelecеtionForm } from '../enums/selection-form.enum';
import { Product } from './product';
export class SaleForm {
  id: number;
  saleFormType: SaleFormType;
  cash: boolean;
  cashless: boolean;
  maxTermConsignment: number;
  orderOnDelayConsignment: boolean;
  ownerShop: Shop;
  shops: Shop[];
  products: ProductLeft[];
  iisActive: boolean;
  constructor() {}
}
