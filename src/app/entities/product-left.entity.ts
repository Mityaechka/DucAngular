import { Shop } from './shop.entity';
import { Product } from './product';
export class ProductLeft {
  constructor(
    public id: number,
    public shop: Shop,
    public product: Product,
    public price: number,
    public currentLeft: number
  ) {}
}
