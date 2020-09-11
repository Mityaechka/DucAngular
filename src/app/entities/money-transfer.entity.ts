import { Shop } from './shop.entity';
import { User } from './user.entity';
import { MoneyTransferState } from '../enums/money-transfer-state.enum';

export class MoneyTransfer {
  id: number;
  toShop: Shop;
  payedUser: User;
  acceptedUser: User;
  fromUser: User;
  fromShop: Shop;
  sum: number;
  transferState: MoneyTransferState;
}
