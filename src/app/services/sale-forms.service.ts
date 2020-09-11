import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
import { SaleForm } from '../entities/sale-form.entity';
import { SaleFormCreateViewModel } from '../view-models/sale-form-create.view-model';

@Injectable({
  providedIn: 'root',
})
export class SaleFormsService {
  constructor(private http: HttpService) {}
  async getSaleForms() {
    return await this.http.post<List<SaleForm[]>>(
      `specialTerms/saleForms`,
      null
    );
  }
  async getSaleForm(id: number) {
    return await this.http.get<SaleForm>(`specialTerms/saleForms/${id}`);
  }
  async createSaleForm(model: SaleFormCreateViewModel) {
    return await this.http.post<number>(`specialTerms/saleForms/create`, model);
  }
  async editSaleForm(model: SaleFormCreateViewModel) {
    return await this.http.post<number>(`specialTerms/saleForms/edit`, model);
  }
}
