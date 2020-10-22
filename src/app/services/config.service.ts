import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
get baseUrl(){
  return  'https://localhost:44327';
}
  constructor() { }
}
//https://duc.kz
//https://localhost:44327
