import { User } from './user.entity';
import { Shop } from './shop.entity';
export class LogisticProductRequest {
  constructor(
    public shop: Shop,
    public user: User,
    public isShipped: boolean,
    public isConfirm: boolean
  ) { }
}
