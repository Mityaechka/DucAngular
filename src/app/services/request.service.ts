import { Shop } from './../entities/shop.entity';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { ProductRequest } from '../entities/product-request.entity';
import { List } from '../models/list.model';
import { User } from '../entities/user.entity';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpService) {}
  async getProviderRequests() {
    return await this.http.post<List<ProductRequest>>(
      'requests/provider',
      null
    );
  }
  async getProviderRequest(id: number) {
    return await this.http.get<ProductRequest>(`requests/provider/${id}`);
  }
  async getSellerRequests() {
    return await this.http.post<List<ProductRequest>>('requests/seller', null);
  }
  async getSellerRequest(id: number) {
    return await this.http.get<ProductRequest>(`requests/seller/${id}`);
  }
  async getLogisticRequests() {
    return await this.http.post<List<ProductRequest>>(
      'requests/logistic',
      null
    );
  }
  async getLogisticRequest(id: number) {
    return await this.http.get<ProductRequest>(`requests/logistic/${id}`);
  }
  async getLogistcChildren() {
    return await this.http.get<Shop[]>('shop/children/logistic');
  }

  async changeRequestLogisticCompany(requestId: number, companyId: number) {
    return await this.http.get(
      `requests/${requestId}/changeCompany/${companyId}`
    );
  }
  async getLogistcDrivers(id: number) {
    return await this.http.get<User[]>(`shop/children/logistic/${id}/drivers`);
  }
  async changeRequestLogisticDriver(requestId: number, driverId: number) {
    return await this.http.get(
      `requests/${requestId}/changeDriver/${driverId}`
    );
  }
  async changeDeliveryDate(requestId: number, date: string) {
    return await this.http.get(
      `requests/${requestId}/changeDeliveryDate/${date}`
    );
  }
  async confirmRequest(requestId: number) {
    return await this.http.get(`requests/${requestId}/confirm`);
  }
  async createRequest(
    id: number,
    data: {
      count: number;
      saleFormType: number;
      planeDeliveryDate: Date;
    }
  ) {
    return await this.http.get(
      `product/lefts/${id}/requests/add?count=${data.count}&saleFormType=${data.saleFormType}&planeDeliveryDate=${data.planeDeliveryDate}`
    );
  }
  async getRequestCode(id: number) {
    return await this.http.get<number>(`requests/${id}/code/show`);
  }
  async addPayRequest(id: number, sum: number) {
    return await this.http.get<any>(
      `logistic/requests/${id}/payRequests/add?sum=${sum}`
    );
  }
  async confirmPayRequest(id: number, code: string) {
    return await this.http.get<any>(
      `logistic/requests/${id}/payRequests/active/confirm?code=${code}`
    );
  }
}
