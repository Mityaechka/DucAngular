export class ProductType {
  public id: number;
  public name: string;
  public childrenTypes: ProductType[];
  constructor() {}
}
export class ProductTypeFullHierarchy {
  public type: ProductType;
  public children: ProductType[];
  public parents: ProductType[];
  constructor() {}
}
