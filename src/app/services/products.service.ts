import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Product } from '../entities/product';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpService) {}
  async getProducts() {
    return await this.http.post<List<Product>>('product', null);
  }


}
