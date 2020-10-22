import { Shop } from '../shop.entity';
import { ReceiptType } from './../receipt-type';
import { ReceiptTemplate } from './receipt-template.entiry';
export class ShopReceiptType {
  id: number;
  shop: Shop;
  receiptType: ReceiptType;
  receiptTemplate: ReceiptTemplate;
}
