import { ReceiptType } from './receipt-type';
import { Product } from './product';
import { SellProduct } from './sell-product';

export class Receipt {
  id: number;
  sum: number;
  receiptType: ReceiptType;
  products: SellProduct[];
}
