export enum ActiveCondition {
  Date,
  SoldCount,
  Manual,
}
export const ActiveConditionDisplay: { [index: number]: string } = [
  'Дата',
  'Кол-во пролданного товара',
  'Отсуствует',
];
