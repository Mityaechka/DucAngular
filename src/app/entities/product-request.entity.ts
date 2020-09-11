import { User } from './user.entity';
import { Shop } from './shop.entity';
import { ProductLine } from './product-line';
import { LogisticProductRequest } from './logistic-productrequest.entity';

export class ProductRequest {
  constructor(
    public id: number,
    public fromShop: Shop,
    public fromUser: User,
    public payedSum: number,
    public totalSum: number,
    public totalSumToPaid: number,
    public leftSum: number,
    public productLines: ProductLine[],
    public planeDeliveryDate: Date,
    public isTransferredToLogistic: boolean,
    public logisticProductRequest: LogisticProductRequest,
    public hasActivePayRequest:boolean
  ) {}
}

