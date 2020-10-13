import { ActiveCondition } from '../enums/active-condition.enum';
import { PromotionType } from '../enums/promotion-type.enum';
import { PurposeType } from '../enums/purpose-type.enum';
import { ProductLeft } from './product-left.entity';
import { Shop } from './shop.entity';
export class Promotion {
  id: number;
  productLeft: ProductLeft;
  promotionType: PromotionType;
  isActive: boolean;
  activeCount: number;
  activeDate: Date;
  sold: number;
  nPromotion: NPromotion;
  crossPromotion: CrossPromotion;
  purposeType: PurposeType;
  activeCondition: ActiveCondition;
  shops: Shop[];
}
export class NPromotion {
  sellCount: number;
  nCount: number;
}
export class CrossPromotion {
  crossProductLeft: ProductLeft;
  sellCount: number;
  crossCount: number;
}
