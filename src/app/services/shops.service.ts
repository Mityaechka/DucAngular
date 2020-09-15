import { PurposeType } from './../enums/purpose-type.enum';
import { ActiveCondition } from './../enums/active-condition.enum';
import { ShopType } from './../enums/shop-type.enum';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
import { Shop } from '../entities/shop.entity';
import { CashPeriod } from '../entities/cash-period.entity';
import { Receipt } from '../entities/receipt.entity';
import { CasherPlace } from '../entities/casher-place.entity';
import { User } from '../entities/user.entity';
import { Promotion } from '../entities/promotion.entity';
import { PromotionType } from '../enums/promotion-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ShopsService {
  constructor(private http: HttpService) {}
  async getShopUsers() {
    return await this.http.get<List<User>>(`shop/users`);
  }
  async getAllShops() {
    return await this.http.post<List<Shop>>(`shops`, null);
  }
  async getCashPeriods() {
    return await this.http.post<List<CashPeriod[]>>(`shop/cashPeriods`, null);
  }
  async getCurrentPeriod() {
    return await this.http.get<CashPeriod>(`shop/period/current`);
  }
  async getCashPeriodReceipts(id: number) {
    return await this.http.post<List<Receipt>>(
      `shop/cashPeriods/${id}/receipts`,
      null
    );
  }
  async closeCurrentPeriod() {
    return await this.http.get<any>(`shop/period/current/close`);
  }
  async getCasherPlaces() {
    return await this.http.post<List<CasherPlace>>(`shop/casherPlaces`, null);
  }
  async getCasherPlace(id: number) {
    return await this.http.get<CasherPlace>(`shop/casherPlaces/${id}`);
  }
  async openNewPeriod(id: number) {
    return await this.http.get<any>(`shop/casherPlaces/${id}/period/open`);
  }
  async collectCash(sum: number) {
    return await this.http.get<any>(`shop/collectCash?sum=${sum}`);
  }
  async getLogisticShops() {
    return await this.http.get<Shop[]>(`shop/children/logistic`);
  }
  async getChildrenShops() {
    return await this.http.get<List<Shop>>(`shop/children`);
  }
  async getLogisticShopUsers(id: number) {
    return await this.http.get<User[]>(`shop/children/logistic/${id}/drivers`);
  }
  async createCasherPlace(name: string) {
    return await this.http.post(`shop/casherPlaces/create`, { name });
  }
  async enableCasherPlace(id: number) {
    return await this.http.get(`shop/casherPlaces/${id}/enable`);
  }
  async disableCasherPlace(id: number) {
    return await this.http.get(`shop/casherPlaces/${id}/disable`);
  }
  async createShopDepartament(data: {
    name: string;
    adress: string;
    shopType: ShopType;
  }) {
    return await this.http.post<any>(`shop/children/create`, data);
  }
  async createShopStaff(data: {
    fio: string;
    login: string;
    password: string;
    roleId: number;
  }) {
    return await this.http.post<any>(`shop/users/create`, data);
  }
  async getPromotions() {
    return await this.http.post<List<Promotion>>(`shop/promotions`, null);
  }
  async getPromotion(id: number) {
    return await this.http.get<Promotion>(`shop/promotions/${id}`);
  }
  async createPromotion(data: {
    activeCondition;
    ActiveCondition;
    activeCount: number;
    crossPromotionCrossCount: number;
    crossPromotionProductLeftId: number;
    crossPromotionSellCount: number;
    nPromotionNCount: number;
    nPromotionSellCount: number;
    productLeftId: number;
    promotionType: PromotionType;
    purposeType: PurposeType;
  }) {
    return await this.http.post<any>(`shop/promotions/create`, data);
  }
  async editPromotion(
    id: number,
    data: {
      activeCondition;
      activeCount: number;
      crossPromotionCrossCount: number;
      crossPromotionProductLeftId: number;
      crossPromotionSellCount: number;
      nPromotionNCount: number;
      nPromotionSellCount: number;
      productLeftId: number;
      promotionType: PromotionType;
      purposeType: PurposeType;
    }
  ) {
    return await this.http.post<any>(`shop/promotions/${id}/edit`, data);
  }
}
