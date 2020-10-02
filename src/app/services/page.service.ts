import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private onTitleChange = new EventEmitter<string>();
  constructor() {}
  subscribeOnTitleChange(callback: (title: string) => void) {
    this.onTitleChange.subscribe(callback);
  }
  cahngeTitle(title: string) {
    this.onTitleChange.emit(title);
  }
}
