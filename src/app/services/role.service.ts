import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
import { Role } from '../entities/role.entity';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private http: HttpService) {}
  async getRoles() {
    return await this.http.post<List<Role>>(`roles`, null);
  }
}
