import { Operator } from 'rxjs';

export class Filter {
  page?: number;
  pageSize ? = 10;
  filterParametrs?: FilterParametr[] = [];
  sortParametr?: SortParametr;
}
export class FilterParametr {
  parametr: string;
  operator: OperatorEnum;
  data: any;
}
export enum OperatorEnum {
  Equal,
  NotEqual,
  Contains,
}
export class SortParametr {
  parametr: string;
  sort: SortEnum;
}
export enum SortEnum {
  None = 0,
  Asc = 1,
  Desc = 2,
}
