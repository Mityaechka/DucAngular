import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { DirectDiscount } from '../entities/direct-discount.entity';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class DirectDiscountsService {
  constructor(private http: HttpService) {}

  async getDirectiscounts() {
    return await this.http.post<List<DirectDiscount>>(
      `specialTerms/directDiscounts`,
      null
    );
  }
  async getDirectiscount(id: number) {
    return await this.http.get<DirectDiscount>(
      `specialTerms/directDiscounts/${id}`
    );
  }
  async createDirectiscount(data: {
    amount: number;
    shops: number[];
    prodcuts: number[];
  }) {
    return await this.http.post<number>(
      `specialTerms/directDiscounts/create`,
      data
    );
  }
  async editDirectiscount(
    id: number,
    data: {
      amount: number;
      shops: number[];
      prodcuts: number[];
    }
  ) {
    return await this.http.post<number>(
      `specialTerms/directDiscounts/${id}/edit`,
      data
    );
  }
}
