import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
import { RetroBonus } from '../entities/retro-bonus/retro-bonus.entity';

@Injectable({
  providedIn: 'root',
})
export class RetroBonusService {
  constructor(private http: HttpService) {}
  async getRetroBonuses() {
    return await this.http.post<List<RetroBonus>>(`specialTerms/retroBonuses`, null);
  }
  async getRetroBonus(id:number) {
    return await this.http.get<RetroBonus>(`specialTerms/retroBonuses/${id}`);
  }
  async createRetroBonus(data: any) {
    return await this.http.post(`specialTerms/retroBonuses/create`, data);
  }
}
