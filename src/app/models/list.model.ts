export class List<T>{
  constructor(public total: number, public list: T[], public count: number, public pageSize: number,public pageIndex: number) { }
}
