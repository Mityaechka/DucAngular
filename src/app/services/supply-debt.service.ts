import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { SupplyDebt } from '../entities/supply-debt.entity';
import { SupplyDebtPayRequest } from '../entities/supply-debt-pay-request.entity';

@Injectable({
  providedIn: 'root',
})
export class SupplyDebtService {
  constructor(private http: HttpService) {}
  async getActiveDetorDebts() {
    return await this.http.post(`debts/supply/debtor`, null);
  }
  async getActiveOwnerDebts() {
    return await this.http.post(`debts/supply/owner`, null);
  }
  async getActiveDriverDebts() {
    return await this.http.post(`debts/supply/driver`, null);
  }
  async getActiveDetorDebt(id: number) {
    return await this.http.get<SupplyDebt>(`debts/supply/debtor/${id}`);
  }
  async getActiveOwnerDebt(id: number) {
    return await this.http.get<SupplyDebt>(`debts/supply/owner/${id}`);
  }

  async bindShop(debtId: number, shopId: number) {
    return await this.http.get(
      `debts/supply/owner/${debtId}/changeCompany/${shopId}`
    );
  }
  async bindUser(debtId: number, userId: number) {
    return await this.http.get(
      `debts/supply/owner/${debtId}/changeDriver/${userId}`
    );
  }

  async makeRequest(id: number) {
    return await this.http.get<any>(`debts/supply/debtor/${id}/request/make`);
  }
  async takeRequest(id: number, code: string) {
    return await this.http.get<any>(`debts/supply/${id}?code=${code}`);
  }
  async getActivePayRequest(id: number) {
    return await this.http.get<SupplyDebtPayRequest>(
      `debts/supply/debtor/${id}/request/active`
    );
  }
  async getActivePayRequestCode(id: number) {
    return await this.http.get<number>(
      `debts/supply/debtor/${id}/request/active/code`
    );
  }
}
