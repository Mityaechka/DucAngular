import { Shop } from './shop.entity';
import { ProductType } from "./product-type";
export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public supplierShop: Shop,
    public price: number,
    public productType: ProductType
  ) { }
}
