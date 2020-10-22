import { ReceiptType } from './../entities/receipt-type';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { ReceiptTemplate } from '../entities/receipt-template/receipt-template.entiry';
import { List } from '../models/list.model';
import { ShopReceiptType } from '../entities/receipt-template/shop-receipt-type.entity';

@Injectable({
  providedIn: 'root',
})
export class ReceiptTemplatesService {
  constructor(private http: HttpService) {}

  async getTemplates() {
    return await this.http.post<List<ReceiptTemplate>>(
      `receipt/templates/`,
      null
    );
  }
  async getTemplate(id: number) {
    return await this.http.get<ReceiptTemplate>(`receipt/templates/${id}`);
  }
  async createTemplate(data: { name: string; receiptFields: any }) {
    data.receiptFields = JSON.stringify(data.receiptFields);
    return await this.http.post<number>(`receipt/templates/create`, data);
  }
  async editTemplate(id: number, data: { name: string; receiptFields: any }) {
    data.receiptFields = JSON.stringify(data.receiptFields);
    return await this.http.post<any>(`receipt/templates/${id}/edit`, data);
  }

  async getReceiptTypes() {
    return await this.http.post<List<ReceiptType>>(`receipt/types/`, null);
  }
  async getShopReceiptTypes() {
    return await this.http.post<List<ShopReceiptType>>(
      `receipt/shop/types/`,
      null
    );
  }
  async getShopReceiptType(id) {
    return await this.http.get<ShopReceiptType>(`receipt/shop/types/${id}`);
  }
  async createShopReceiptTypes(data: { templateId: number; typeId: number }) {
    return await this.http.get<number>(`receipt/shop/types/create`, {
      content: data,
    });
  }
  async editShopReceiptTypes(
    id: number,
    data: { templateId: number; typeId: number }
  ) {
    return await this.http.get<number>(`receipt/shop/types/${id}/edit`, {
      content: data,
    });
  }
}
