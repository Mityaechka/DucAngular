export class List<T> {
  constructor(
    public total: number,
    public list: T[],
    public count: number,
    public pageSize: number,
    public pageIndex: number
  ) {}
  static createList(data: any[]): List<any> {
    return new List<any>(data.length, data, data.length, 0, 0);
  }
}
