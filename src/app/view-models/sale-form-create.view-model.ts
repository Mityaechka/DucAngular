import { SelecеtionForm } from '../enums/selection-form.enum';

export class SaleFormCreateViewModel {
  id: number;
  productId: number;
  shopId: number;
  canConsignment: boolean;
  maxTermConsignment: number;
  orderOnDelayConsignment: boolean;
  canImplement: boolean;
  cash: boolean;
  cashless: boolean;
}
