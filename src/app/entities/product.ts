import { Shop } from './shop.entity';
import { ProductType } from './product-type';
import { Measure } from '../enums/measure.enum';
export class Product {
  public id: number;
  public name: string;
  public description: string;
  public supplierShop: Shop;
  public price: number;
  //public retailPrice: number;
  public measure: Measure;
  public markup: number;
  public barcode: string;
  public productType: ProductType;
  constructor() {}

  get retailPrice() {
    return this.price + this.price * (this.markup / 100);
  }

  static Assign(data: any) {
    return Object.assign(new Product(), data);
  }
}
