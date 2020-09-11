import { Injectable } from '@angular/core';
import { ApiResult } from '../models/api-result.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private path = 'https://localhost:44327/api';

  constructor(private http: HttpClient) { }
  public get<T>(url: string): Promise<ApiResult<T>> {
    const promise = new Promise<ApiResult<T>>((resolve, reject) => {
      const req = this.http.get(`${this.path}/${url}`, { withCredentials: true }).toPromise();
      req.then((data: any) => {
        resolve(data);
      },
        error => {
          resolve(new ApiResult(false, 'Ошибка сервера', null));
        });
    }
    );
    return promise;
  }
  public post<T>(url: string, content: any): Promise<ApiResult<T>> {
    let headers = new HttpHeaders();
    headers = headers.append('content-type', 'application/json');
    const promise = new Promise<ApiResult<T>>((resolve, reject) => {
      const req = this.http.post(`${this.path}/${url}`, JSON.stringify(content), { withCredentials: true, headers }).toPromise();
      req.then((data: any) => {
        resolve(data);
      },
        error => {
          resolve(new ApiResult(false, 'Ошибка сервера', null));
        });
    }
    );
    return promise;

  }
}
