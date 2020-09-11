export enum MoneyTransferState {
  Requested,
  WaitAccept,
  Transfared,
}
export const MoneyTransferStateDisplay: { [index: number]: string } = [
  'Создано',
  'Ожидает подтверждения',
  'Подтверждено'
];
