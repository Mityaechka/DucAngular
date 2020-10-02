import { User } from './../entities/user.entity';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from './http.service';
import { LoginViewModel } from './../view-models/login.view-model';
import { Shop } from '../entities/shop.entity';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpService) { }
  userChange: EventEmitter<User> = new EventEmitter<User>();
  async login(model: LoginViewModel) {
    const response = await this.http.post('auth/login', model);
    this.getUser().then(x => {
      this.userChange.emit(x.result);
    });
    return response;
  }
  async logout() {
    const response = await this.http.get('auth/logout');
    this.getUser().then(x => {
      this.userChange.emit(x.result);
    });
    return response;
  }
  async getUser() {
    return await this.http.get<User>('auth/user');
  }
  async getUserShops() {
    return await this.http.get<Shop[]>('auth/user/shops');
  }
}
