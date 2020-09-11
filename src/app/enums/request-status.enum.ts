export enum RequestStatus {
  Wait,
  Reject,
  Confirmed,
}
export const RequestStatusDisplay: { [index: number]: string } = [
  'Ожидает',
  'Отклонено',
  'Подтверждено',
];
