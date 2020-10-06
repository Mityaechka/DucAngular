import { List } from 'src/app/models/list.model';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { ProductLeft } from '../entities/product-left.entity';
import { SaleForm } from '../entities/sale-form.entity';

@Injectable({
  providedIn: 'root',
})
export class LeftsService {
  constructor(private http: HttpService) {}
  async getProductsLefts() {
    return await this.http.post<List<ProductLeft>>(`product/lefts`, null);
  }
  async getProductsLeft(id: number) {
    return await this.http.get<ProductLeft>(`product/lefts/${id}`);
  }
  async setProductLeftIsProvider(id: number, state: boolean) {
    return await this.http.get<ProductLeft>(
      `product/lefts/${id}/isProvider?state=${state}`
    );
  }
  async setProductLeftIsSell(id: number, state: boolean) {
    return await this.http.get<ProductLeft>(
      `product/lefts/${id}/isSell?state=${state}`
    );
  }
  async getProductsLeftByBarcode(barcode: string) {
    return await this.http.get<ProductLeft>(
      `product/lefts/barcode?barcode=${barcode}`
    );
  }
  async getProviderProductsLefts() {
    return await this.http.post<List<ProductLeft>>(
      `product/lefts/provider`,
      null
    );
  }
  async getProviderProductsLeft(id: number) {
    return await this.http.get<ProductLeft>(`product/lefts/provider/${id}`);
  }
  async getDirectDiscount(id: number) {
    return await this.http.get<number>(
      `product/lefts/${id}/discount/direct/amount`
    );
  }
  async getSaleForm(id: number) {
    return await this.http.get<SaleForm>(`product/lefts/${id}/saleForm`);
  }
  async sellProducts(data: { id: number; count: number }[]) {
    return await this.http.post('product/lefts/sell', { products: data });
  }
  async changePrice(id: number, price: number) {
    return await this.http.get(
      `product/lefts/${id}/changePrice?markup=${price}`
    );
  }
}
