import { ShopType } from '../enums/shop-type.enum';

export class Shop {
  constructor(
    public id: number,
    public name: string,
    public shopType: ShopType
  ) {}
}
