import { ProductLeft } from './product-left.entity';
import { Shop } from './shop.entity';
import { SelecеtionForm } from '../enums/selection-form.enum';
import { Product } from './product';
export class SaleForm {
  id: number;
  canConsignment: boolean;
  canImplement: boolean;
  cash: boolean;
  cashless: boolean;
  maxTermConsignment: number;
  orderOnDelayConsignment: boolean;
  ownerShop: Shop;
  shops: Shop[];
  products: ProductLeft[];
  constructor() {}
}
