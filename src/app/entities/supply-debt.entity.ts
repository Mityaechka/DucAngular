import { Shop } from './shop.entity';
import { SaleFormType } from '../enums/sale-form-type.enum';
import { User } from './user.entity';
export class SupplyDebt {
  id: number;
  ownerShop: Shop;
  debtorshop: Shop;
  saleFormType: SaleFormType;
  bindedLogisticCompany: Shop;
  bindedDriver: User;
  currentBalance: number;
  paid: number;
  consigmentdate: Date;
  implementSum: number;
  hasActiveRequest: boolean;
}
