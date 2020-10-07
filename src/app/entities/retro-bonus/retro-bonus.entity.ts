import { RetroBonusTypeEnum } from './../../enums/retro-bonus-type.enum';
import { Shop } from './../shop.entity';
import { Product } from '../product';
export class RetroBonus {
  id:number;
  ownerShop: Shop;
  shops: Shop[];
  products: Product[];
  types: RetroBonusType;
}
export class RetroBonusType {
  type: RetroBonusTypeEnum;
  sellOut: SellOut;
  sellIn: SellIn;
  marketing: Marketing;
  debit: Debit;
}
export class SellIn {
  from: number;
  to: number;
  value: number;
}
export class SellOut {
  from: number;
  to: number;
  value: number;
}
export class Marketing {
  description: string;
  value: number;
}
export class Debit {
  fromDays: number;
  toDays: number;
  value: number;
}
