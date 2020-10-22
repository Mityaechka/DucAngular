import { ReceiptField } from './receipt-field.entity';

export class ReceiptTemplate {
  id: number;
  name: string;
  receiptFields: ReceiptField[];
}
