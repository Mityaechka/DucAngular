import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { Group } from '../entities/group.entity';
import { Shop } from '../entities/shop.entity';
import { List } from '../models/list.model';

@Injectable({
  providedIn: 'root',
})
export class ShopGroupsService {
  constructor(private http: HttpService) {}

  async getGroups(name?: string) {
    return await this.http.post<List<Group<Shop>>>(
      `groups/shops${name ? `?name=${name}` : ''}`,
      null
    );
  }
  async getGroup(id: number) {
    return await this.http.get<Group<Shop>>(`groups/shops/${id}`);
  }
  async createGroup(data: { name: string; list: number[] }) {
    return await this.http.post<List<Group<Shop>>>(`groups/shops/create`, data);
  }
}
