import {
  ProductType,
  ProductTypeFullHierarchy,
} from './../entities/product-type';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductTypesService {
  constructor(private http: HttpService) {}

  async getParentType(typeId: number) {
    return await this.http.get<ProductType>(`product/types/${typeId}/parent`);
  }
  async getChildrenTypes(typeId: number) {
    return await this.http.get<ProductType[]>(
      `product/types/${typeId}/children`
    );
  }
  async getType(typeId: number) {
    return await this.http.get<ProductType>(`product/types/${typeId}`);
  }
  async getRootType() {
    return await this.http.get<ProductType>(`product/types/root`);
  }
  async getTypeFullHierarchy(typeId: number) {
    return await this.http.get<ProductTypeFullHierarchy>(
      `product/types/${typeId}/full-hierarchy`
    );
  }
  async createType(data: { name: string; parentTypeId: number }) {
    return await this.http.post<number>(`product/types/create`,data);
  }
}
