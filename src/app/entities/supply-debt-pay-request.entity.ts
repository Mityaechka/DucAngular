import { User } from './user.entity';
import { RequestStatus } from '../enums/request-status.enum';

export class SupplyDebtPayRequest {
  id: number;
  user: User;
  status: RequestStatus;
  supplyDebtId:number;
}
