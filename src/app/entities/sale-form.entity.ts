import { Shop } from './shop.entity';
import { SelecеtionForm } from '../enums/selection-form.enum';
import { Product } from './product';
export class SaleForm {
  id: number;
  canConsigment: boolean;
  canImplement: boolean;
  cash: boolean;
  cashless: boolean;
  maxTermConsignment: number;
  orderOnDelayConsignment: boolean;
  ownerShop: Shop;
  shopSelectionForm: SelecеtionForm;
  shop: Shop;
  productSelectionForm: SelecеtionForm;
  product: Product;
  constructor() {}

  shopDisplay() {
    return this.shopSelectionForm === SelecеtionForm.All
      ? 'Все'
      : this.shop.name;
  }
  productDisplay() {
    return this.productSelectionForm === SelecеtionForm.All
      ? 'Все'
      : this.product.name;
  }
}
