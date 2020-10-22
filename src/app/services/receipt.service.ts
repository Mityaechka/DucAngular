import { Receipt } from './../entities/receipt.entity';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReceiptService {
  constructor(private http: HttpService) {}

  async getReceipt(id: number) {
    return await this.http.get<Receipt>(`receipt/${id}`);
  }
  async getReceiptPrintData(id: number) {
    return await this.http.get<Receipt>(`receipt/${id}/printData`);
  }
}
