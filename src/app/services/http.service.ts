import { ConfigService } from './config.service';
import { User } from './../entities/user.entity';
import { ApiResult } from './../models/api-result.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JsonConvert } from 'json2typescript';
import { RetroBonusObligation } from '../entities/retro-bonus/retro-bonus-obligation.entity';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private path: string;
  //private path = 'https://duc.kz/api';
  constructor(private http: HttpClient, private config: ConfigService) {
    this.path = `${config.baseUrl}/api`;
  }
  public get<T>(
    url: string,
    options?: { content?: any }
  ): Promise<ApiResult<T>> {
    if (options?.content) {
      const str = [];
      for (const p in options.content) {
        if (options.content.hasOwnProperty(p)) {
          str.push(
            encodeURIComponent(p) + '=' + encodeURIComponent(options.content[p])
          );
        }
      }
      url += `?${str.join('&')}`;
    }
    const promise = new Promise<ApiResult<T>>((resolve, reject) => {
      const req = this.http
        .get(`${this.path}/${url}`, { withCredentials: true })
        .toPromise();
      req.then(
        (data: any) => {
          const apiResult = Object.assign(
            new ApiResult<T>(),
            data
          ) as ApiResult<T>;
          resolve(apiResult);
        },
        (error) => {
          resolve({
            isSuccess: false,
            errorMessage: 'Ошибка сервера',
            result: null,
          });
        }
      );
    });
    return promise;
  }
  public post<T>(
    url: string,
    content: any,
    options?: { isJson: boolean }
  ): Promise<ApiResult<T>> {
    const o = Object.assign({ isJson: true }, options ?? {});
    let data;
    let headers = new HttpHeaders();
    if (o.isJson) {
      data = JSON.stringify(content);
      headers = headers.append('content-type', 'application/json');
    } else {
      data = content;
    }

    const promise = new Promise<ApiResult<T>>((resolve, reject) => {
      const req = this.http
        .post(`${this.path}/${url}`, data, { withCredentials: true, headers })
        .toPromise();
      req.then(
        // tslint:disable-next-line: no-shadowed-variable
        (data: any) => {
          resolve(Object.assign(new ApiResult<T>(), data));
        },
        (error) => {
          resolve({
            isSuccess: false,
            errorMessage: 'Ошибка сервера',
            result: null,
          });
        }
      );
    });
    return promise;
  }

  public postForm<T>(url: string, content: any): Promise<ApiResult<T>> {
    const data = this.jsonToFormData(content);
    return this.post<T>(url, data, { isJson: false });
  }
  private buildFormData(formData, data, parentKey?) {
    if (
      data &&
      typeof data === 'object' &&
      !(data instanceof Date) &&
      !(data instanceof File)
    ) {
      Object.keys(data).forEach((key) => {
        this.buildFormData(
          formData,
          data[key],
          parentKey ? `${parentKey}[${key}]` : key
        );
      });
    } else {
      const value = data == null ? '' : data;

      formData.append(parentKey, value);
    }
  }

  private jsonToFormData(data) {
    const formData = new FormData();

    this.buildFormData(formData, data);

    return formData;
  }
}
