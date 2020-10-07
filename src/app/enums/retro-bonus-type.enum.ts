export enum RetroBonusTypeEnum {
  sellIn = 0,
  sellOut,
  marketing,
  debit,
}

export const RetroBonusTypeDisplay: { [index: number]: string } = [
  'Sell In',
  'Sell Out',
  'Marketing',
  'Debit'
];
