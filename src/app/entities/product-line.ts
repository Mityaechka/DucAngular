export class ProductLine {
  constructor(
    public id: number,
    public requestCount: number,
    public responseCount: number,
    public directDiscount: number,
    public price: number,
    public discountPrice: number,
    public totalSum: number,
    public saleFormTypeName: string,
    public consigmentDate: Date
  ) { }
}
