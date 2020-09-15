import { ProductParametr } from './../entities/product-parametr.entity';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Product } from '../entities/product';
import { List } from '../models/list.model';
import { ProductAttribute } from '../entities/attribute.entity';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpService) {}
  async getProducts() {
    return await this.http.post<List<Product>>('product', null);
  }
  async getProduct(id: number) {
    return await this.http.get<Product>(`product/${id}`);
  }
  async createProduct(data: FormData) {
    return await this.http.post(`product/add`, data);
  }
  async editProduct(id: number, data: FormData) {
    return await this.http.post(`product/${id}/edit`, data);
  }
  async getAttributes() {
    return await this.http.post<List<ProductAttribute>>(
      `product/attributes`,
      null
    );
  }
  async getAttribute(id: number) {
    return await this.http.get<ProductAttribute>(`product/attributes/${id}`);
  }
  async createAttribute(data: { name: string }) {
    return await this.http.post<ProductAttribute>(
      `product/attributes/create`,
      data
    );
  }
  async editeAttribute(id: number, data: { name: string }) {
    return await this.http.post<ProductAttribute>(
      `product/attributes/${id}/edit`,
      data
    );
  }
  async productArriving(data: {
    productId: number;
    count: number;
    barcode: string;
    price: number;
  }) {
    return await this.http.post(`product/arriving`, data);
  }
  async getProductParametrs(id: number) {
    return await this.http.get<List<ProductParametr>>(
      `product/${id}/parametrs`
    );
  }
}
