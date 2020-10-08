import { Shop } from './../shop.entity';
import { ProductLeft } from './../product-left.entity';
import { RetroBonusType } from './retro-bonus.entity';
export class RetroBonusObligation {
  id: number;
  retroBonusType: RetroBonusType;
  productLeft: ProductLeft;
  ownerShop: Shop;
  obligationHistories: ObligationHisory[];
  debitDaysCount: number;
  marketingIsActive: boolean;
}

export class ObligationHisory {
  id: number;
  count: number;
  price: number;
}
