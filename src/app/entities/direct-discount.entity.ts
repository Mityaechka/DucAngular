import { Product } from './product';
import { Shop } from './shop.entity';

export class DirectDiscount {
  id: number;
  ownerShop: Shop;
  shops: Shop[];
  products: Product[];
  amount: number;
  isActive: boolean;
  constructor() {}
}
