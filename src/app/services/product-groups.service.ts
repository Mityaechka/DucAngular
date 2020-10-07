import { Injectable } from '@angular/core';
import { Group } from '../entities/group.entity';
import { Product } from '../entities/product';
import { ProductLeft } from '../entities/product-left.entity';
import { List } from '../models/list.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupsService {

  constructor(private http: HttpService) {}

  async getGroups(name?: string) {
    return await this.http.post<List<Group<ProductLeft>>>(
      `groups/products${name ? `?name=${name}` : ''}`,
      null
    );
  }
  async getGroup(id: number) {
    return await this.http.get<Group<ProductLeft>>(`groups/products/${id}`);
  }
  async createGroup(data: { name: string; list: number[] }) {
    return await this.http.post<List<Group<ProductLeft>>>(`groups/products/create`, data);
  }
}
