import { User } from './user.entity';
import { CasherPlace } from './casher-place.entity';
export class CashPeriod {
  id: number;
  startSum: number;
  endSum: number;
  startTime: Date;
  endTime: Date;
  user: User;
  casherPlace: CasherPlace;
  expectedEndSum: number;
  isEnd: boolean;
}

