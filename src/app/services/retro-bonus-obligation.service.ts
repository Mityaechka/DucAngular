import { RetroBonusObligation } from './../entities/retro-bonus/retro-bonus-obligation.entity';
import { List } from './../models/list.model';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RetroBonusObligationService {
  constructor(private http: HttpService) {}
  async getOwnerObligations() {
    return await this.http.post<List<RetroBonusObligation>>(
      `retroBonusObligation/owner`,
      null
    );
  }
  async getReceiverObligations() {
    return await this.http.post<List<RetroBonusObligation>>(
      `retroBonusObligation/receiver`,
      null
    );
  }

  async getOwnerObligation(id: number) {
    return await this.http.get<RetroBonusObligation>(
      `retroBonusObligation/owner/${id}`
    );
  }
  async getReceiverObligation(id: number) {
    return await this.http.get<RetroBonusObligation>(
      `retroBonusObligation/receiver/${id}`
    );
  }

  async createMoneyTransfer(id: number) {
    return await this.http.post<RetroBonusObligation>(
      `retroBonusObligation/owner/${id}/transfer`,
      null
    );
  }
}
