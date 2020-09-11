import { User } from './user.entity';
export class CasherPlace {
  id: number;
  name: string;
  userInPlace: User;
  isActive: boolean;
}
