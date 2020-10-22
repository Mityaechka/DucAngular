import { ReceiptType } from './receipt-type';
import { Product } from './product';
import { SellProduct } from './sell-product';
import { ReceiptTemplate } from './receipt-template/receipt-template.entiry';

export class Receipt {
  id: number;
  sum: number;
  receiptType: ReceiptType;
  products: SellProduct[];
  receiptTemplate: ReceiptTemplate;
  createDate:Date;
}
