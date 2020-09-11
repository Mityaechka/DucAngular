import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { MoneyTransfer } from '../entities/money-transfer.entity';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class MoneyTransferService {
  constructor(private http: HttpService) {}

  async getFromNotTransfered() {
    return await this.http.post<List<MoneyTransfer>>(
      `transfers/notTransfered/from`,
      null
    );
  }
  async getToNotTransfered() {
    return await this.http.post<List<MoneyTransfer>>(
      `transfers/notTransfered/to`,
      null
    );
  }
  async payTransfer(id: number) {
    return await this.http.get<any>(`transfers/${id}/pay`);
  }
  async acceptTransfer(id: number) {
    return await this.http.get<any>(`transfers/${id}/accept`);
  }
}
